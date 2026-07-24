"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  PhotoIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { createClient } from "@/lib/supabase/client";
import { Link, useRouter } from "@/i18n/navigation";
import {
  getAdminAccessMessage,
  getAuthenticatedAdmin,
} from "@/lib/admin-session";

const TABLE_NAME = "platforms";

const paymentOptions = [
  "PayPal",
  "Payoneer",
  "Wise",
  "Bank Transfer",
  "Crypto",
];

const categoryOptions = [
  "AI Training",
  "Data Annotation",
  "AI Evaluation",
];

const categoryColorOptions = [
  { label: "Blue", value: "blue", className: "bg-blue-500" },
  { label: "Emerald", value: "green", className: "bg-emerald-500" },
  { label: "Orange", value: "orange", className: "bg-orange-500" },
  { label: "Purple", value: "purple", className: "bg-purple-500" },
  { label: "Slate", value: "slate", className: "bg-slate-500" },
];

async function refreshPublicPlatformCache() {
  try {
    await fetch("/api/revalidate-platforms", {
      method: "POST",
    });
  } catch {}
}

const emptyForm = {
  allProjectsReferralLink: "",
  category: "AI Training",
  categoryColor: "blue",
  countries: "",
  description: "",
  shortDescription: "",
  hourlyRate: "",
  image: "",
  name: "",
  payment: [],
  rating: "0",
  referralLinks: [{ projectName: "", referralLink: "" }],
  requirements: [""],
  howToPass: [""],
  pros: [""],
  cons: [""],
  frequentlyAsked: [{ question: "", answer: "" }],
  slug: "",
  websiteUrl: "",
};

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function normalizeTextList(value) {
  return Array.isArray(value) && value.length > 0
    ? value.map((item) => String(item || ""))
    : [""];
}

function compactTextList(value) {
  return value.map((item) => item.trim()).filter(Boolean);
}

function normalizeReferralLinkItems(value) {
  const referralLinks = Array.isArray(value) ? value : value ? [value] : [];

  const normalizedLinks = referralLinks.map((item) => {
    if (typeof item === "string") {
      return {
        projectName: "",
        referralLink: item,
      };
    }

    return {
      projectName: item?.projectName || item?.label || "",
      referralLink: item?.referralLink || item?.url || item?.href || "",
    };
  });

  return normalizedLinks.length > 0
    ? normalizedLinks
    : [
        {
          projectName: "",
          referralLink: "",
        },
      ];
}

function normalizePlatform(platform) {
  if (!platform) {
    return emptyForm;
  }

  const legacyReferralLink =
    typeof platform.referralLink === "string" ? platform.referralLink : "";

  return {
    allProjectsReferralLink:
      platform.allProjectsReferralLink || legacyReferralLink || "",
    category: platform.category || "AI Training",
    categoryColor: platform.categoryColor || "blue",
    countries: platform.countries || "",
    description: platform.description || "",
    shortDescription: platform.shortDescription || "",
    hourlyRate: platform.hourlyRate || "",
    image: platform.image || "",
    name: platform.name || "",
    payment: Array.isArray(platform.payment) ? platform.payment : [],
    rating:
      platform.rating === null || platform.rating === undefined
        ? "0"
        : String(platform.rating),
    referralLinks: normalizeReferralLinkItems(platform.referralLinks),
    requirements: normalizeTextList(platform.requirements),
    howToPass: normalizeTextList(platform.howToPass),
    pros: normalizeTextList(platform.prosAndCons?.pros),
    cons: normalizeTextList(platform.prosAndCons?.cons),
    frequentlyAsked:
      Array.isArray(platform.frequentlyAsked) && platform.frequentlyAsked.length > 0
        ? platform.frequentlyAsked.map((item) => ({
            question: item.question || "",
            answer: item.answer || "",
          }))
        : [{ question: "", answer: "" }],
    slug: platform.slug || "",
    websiteUrl: platform.websiteUrl || "",
  };
}

function validateForm(form) {
  const errors = {};
  const requiredFields = [
    ["name", "Name is required."],
    ["slug", "Slug is required."],
    ["websiteUrl", "Website URL is required."],
    ["image", "Website Image URL is required."],
    ["shortDescription", "Short description is required."],
    ["description", "Full description is required."],
  ];

  requiredFields.forEach(([field, message]) => {
    if (!String(form[field]).trim()) {
      errors[field] = message;
    }
  });

  if (form.websiteUrl && !isValidHttpUrl(form.websiteUrl)) {
    errors.websiteUrl = "Enter a valid http or https website URL.";
  }

  if (form.image && !isValidHttpUrl(form.image)) {
    errors.image = "Enter a valid http or https image URL.";
  }

  if (
    form.allProjectsReferralLink &&
    !isValidHttpUrl(form.allProjectsReferralLink)
  ) {
    errors.allProjectsReferralLink =
      "Enter a valid http or https all projects referral link.";
  }

  form.referralLinks.forEach((item, index) => {
    const projectName = item.projectName.trim();
    const referralLink = item.referralLink.trim();

    if (projectName && !referralLink) {
      errors[`referralLink-${index}`] = "Referral link is required for this project.";
    }

    if (referralLink && !projectName) {
      errors[`projectName-${index}`] = "Project name is required for this link.";
    }

    if (referralLink && !isValidHttpUrl(referralLink)) {
      errors[`referralLink-${index}`] = "Enter a valid http or https referral link.";
    }
  });

  form.frequentlyAsked.forEach((item, index) => {
    const question = item.question.trim();
    const answer = item.answer.trim();

    if (question && !answer) {
      errors[`faqAnswer-${index}`] = "Answer is required for this question.";
    }

    if (answer && !question) {
      errors[`faqQuestion-${index}`] = "Question is required for this answer.";
    }
  });

  const rating = Number(form.rating);
  if (Number.isNaN(rating) || rating < 0 || rating > 5) {
    errors.rating = "Rating must be between 0 and 5.";
  }

  return errors;
}

function buildPayload(form) {
  const referralLinks = form.referralLinks
    .map((item) => ({
      projectName: item.projectName.trim(),
      referralLink: item.referralLink.trim(),
    }))
    .filter((item) => item.projectName || item.referralLink);

  return {
    allProjectsReferralLink: form.allProjectsReferralLink.trim(),
    category: form.category.trim(),
    categoryColor: form.categoryColor.trim(),
    countries: form.countries.trim(),
    description: form.description.trim(),
    shortDescription: form.shortDescription.trim(),
    hourlyRate: form.hourlyRate.trim(),
    image: form.image.trim(),
    name: form.name.trim(),
    payment: form.payment,
    rating: Number(form.rating),
    referralLinks,
    requirements: compactTextList(form.requirements),
    howToPass: compactTextList(form.howToPass),
    prosAndCons: {
      pros: compactTextList(form.pros),
      cons: compactTextList(form.cons),
    },
    frequentlyAsked: form.frequentlyAsked
      .map((item) => ({
        question: item.question.trim(),
        answer: item.answer.trim(),
      }))
      .filter((item) => item.question || item.answer),
    slug: slugify(form.slug),
    websiteUrl: form.websiteUrl.trim(),
  };
}

function FieldError({ children }) {
  if (!children) {
    return null;
  }

  return <p className="mt-1 text-xs font-medium text-red-600">{children}</p>;
}

function TextInput({
  error,
  helperText,
  id,
  label,
  required = false,
  textarea = false,
  ...props
}) {
  const Input = textarea ? "textarea" : "input";

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-900" htmlFor={id}>
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </label>
      <Input
        aria-invalid={error ? "true" : "false"}
        className={`w-full rounded-lg border bg-white px-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 ${
          textarea ? "min-h-32 py-3" : "h-11"
        } ${error ? "border-red-300" : "border-gray-300"}`}
        id={id}
        {...props}
      />
      {helperText ? (
        <p className="mt-1 text-xs leading-5 text-gray-500" id={`${id}-help`}>
          {helperText}
        </p>
      ) : null}
      <FieldError>{error}</FieldError>
    </div>
  );
}

function DynamicTextList({
  errors,
  items,
  label,
  name,
  onAdd,
  onRemove,
  onUpdate,
  placeholder,
}) {
  return (
    <fieldset>
      <div className="mb-3 flex items-center justify-between gap-3">
        <legend className="text-sm font-semibold text-gray-900">{label}</legend>
        <button
          aria-label={`Add ${label}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
          onClick={() => onAdd(name)}
          type="button"
        >
          <PlusIcon aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            className="grid gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 md:grid-cols-[minmax(0,1fr)_auto]"
            key={index}
          >
            <TextInput
              error={errors[`${name}-${index}`]}
              id={`${name}-${index}`}
              label={`${label} ${index + 1}`}
              onChange={(event) => onUpdate(name, index, event.target.value)}
              placeholder={placeholder}
              value={item}
            />

            <div className="flex items-end gap-2">
              <button
                aria-label={`Add ${label}`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
                onClick={() => onAdd(name)}
                type="button"
              >
                <PlusIcon aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                aria-label={`Remove ${label}`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-red-100 bg-white text-red-600 transition-colors hover:border-red-200 hover:bg-red-50"
                onClick={() => onRemove(name, index)}
                type="button"
              >
                <XMarkIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

export default function PlatformForm({
  embedded = false,
  initialPlatform = null,
  mode = "create",
  onDeleted,
  onSaved,
  redirectOnSuccess = true,
}) {
  const router = useRouter();
  const [form, setForm] = useState(() => normalizePlatform(initialPlatform));
  const [errors, setErrors] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [message, setMessage] = useState(null);
  const [slugWasEdited, setSlugWasEdited] = useState(Boolean(initialPlatform?.slug));
  const [access, setAccess] = useState({
    authorized: false,
    checking: true,
    message: "",
  });

  const isUpdating = mode === "update";
  const heading = isUpdating ? "Update Platform" : "Add Platform";
  const intro = isUpdating
    ? "Edit the selected platform details and keep the directory accurate."
    : "Create a new AI training platform entry for the public directory.";

  const supabase = useMemo(() => createClient(), []);

  const ensureAdminAccess = useCallback(async () => {
    const result = await getAuthenticatedAdmin(supabase);

    if (result.status === "unauthenticated") {
      router.replace("/signin");
      return false;
    }

    if (result.status === "authorized") {
      setAccess({
        authorized: true,
        checking: false,
        message: "",
      });
      return true;
    }

    const accessMessage = getAdminAccessMessage(result);
    setAccess({
      authorized: false,
      checking: false,
      message: accessMessage,
    });
    setMessage({
      text: accessMessage,
      type: "error",
    });
    return false;
  }, [router, supabase]);

  useEffect(() => {
    let isMounted = true;

    async function verifyAccess() {
      const result = await getAuthenticatedAdmin(supabase);

      if (!isMounted) {
        return;
      }

      if (result.status === "unauthenticated") {
        router.replace("/signin");
        return;
      }

      if (result.status === "authorized") {
        setAccess({
          authorized: true,
          checking: false,
          message: "",
        });
        return;
      }

      setAccess({
        authorized: false,
        checking: false,
        message: getAdminAccessMessage(result),
      });
    }

    verifyAccess();

    return () => {
      isMounted = false;
    };
  }, [router, supabase]);

  useEffect(() => {
    setForm(normalizePlatform(initialPlatform));
    setSlugWasEdited(Boolean(initialPlatform?.slug));
    setErrors({});
    setMessage(null);
  }, [initialPlatform]);

  useEffect(() => {
    setImageFailed(false);
  }, [form.image]);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  };

  const handleNameChange = (event) => {
    const value = event.target.value;

    setForm((current) => ({
      ...current,
      name: value,
      slug: slugWasEdited ? current.slug : slugify(value),
    }));
    setErrors((current) => ({
      ...current,
      name: undefined,
      slug: undefined,
    }));
  };

  const handleSlugChange = (event) => {
    setSlugWasEdited(true);
    updateField("slug", slugify(event.target.value));
  };

  const regenerateSlug = () => {
    setSlugWasEdited(false);
    updateField("slug", slugify(form.name));
  };

  const togglePayment = (method) => {
    setForm((current) => {
      const hasMethod = current.payment.includes(method);

      return {
        ...current,
        payment: hasMethod
          ? current.payment.filter((item) => item !== method)
          : [...current.payment, method],
      };
    });
  };

  const addReferralLink = () => {
    setForm((current) => ({
      ...current,
      referralLinks: [
        ...current.referralLinks,
        { projectName: "", referralLink: "" },
      ],
    }));
  };

  const removeReferralLink = (index) => {
    setForm((current) => ({
      ...current,
      referralLinks:
        current.referralLinks.length === 1
          ? [{ projectName: "", referralLink: "" }]
          : current.referralLinks.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const updateReferralLink = (index, field, value) => {
    setForm((current) => ({
      ...current,
      referralLinks: current.referralLinks.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      ),
    }));
    setErrors((current) => ({
      ...current,
      [`projectName-${index}`]: undefined,
      [`referralLink-${index}`]: undefined,
    }));
  };

  const addTextListItem = (field) => {
    setForm((current) => ({
      ...current,
      [field]: [...current[field], ""],
    }));
  };

  const removeTextListItem = (field, index) => {
    setForm((current) => ({
      ...current,
      [field]:
        current[field].length === 1
          ? [""]
          : current[field].filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const updateTextListItem = (field, index, value) => {
    setForm((current) => ({
      ...current,
      [field]: current[field].map((item, itemIndex) =>
        itemIndex === index ? value : item
      ),
    }));
    setErrors((current) => ({
      ...current,
      [`${field}-${index}`]: undefined,
    }));
  };

  const addFaqItem = () => {
    setForm((current) => ({
      ...current,
      frequentlyAsked: [
        ...current.frequentlyAsked,
        { question: "", answer: "" },
      ],
    }));
  };

  const removeFaqItem = (index) => {
    setForm((current) => ({
      ...current,
      frequentlyAsked:
        current.frequentlyAsked.length === 1
          ? [{ question: "", answer: "" }]
          : current.frequentlyAsked.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const updateFaqItem = (index, field, value) => {
    setForm((current) => ({
      ...current,
      frequentlyAsked: current.frequentlyAsked.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      ),
    }));
    setErrors((current) => ({
      ...current,
      [`faqQuestion-${index}`]: undefined,
      [`faqAnswer-${index}`]: undefined,
    }));
  };

  const checkSlugIsUnique = async (slug) => {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("id, slug")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return true;
    }

    return isUpdating && String(data.id) === String(initialPlatform?.id);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);

    if (!supabase) {
      setMessage({
        text: "Supabase is not configured. Check the environment variables.",
        type: "error",
      });
      return;
    }

    const isAuthorized = await ensureAdminAccess();

    if (!isAuthorized) {
      return;
    }

    const nextErrors = validateForm(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (isUpdating && !initialPlatform?.id) {
      setMessage({
        text: "This platform cannot be updated because it has no id.",
        type: "error",
      });
      return;
    }

    const payload = buildPayload(form);
    setIsSaving(true);

    try {
      const slugIsUnique = await checkSlugIsUnique(payload.slug);

      if (!slugIsUnique) {
        setErrors({ slug: "This slug is already used by another platform." });
        setIsSaving(false);
        return;
      }

      const request = isUpdating
        ? supabase.from(TABLE_NAME).update(payload).eq("id", initialPlatform.id)
        : supabase.from(TABLE_NAME).insert(payload);

      const { error } = await request;

      if (error) {
        throw error;
      }

      await refreshPublicPlatformCache();

      setMessage({
        text: isUpdating
          ? "Platform updated successfully."
          : "Platform added successfully.",
        type: "success",
      });

      await Swal.fire({
        icon: "success",
        title: isUpdating ? "Platform Updated" : "Platform Added",
        text: redirectOnSuccess
          ? "Redirecting back to the platforms page."
          : "The platform list has been refreshed.",
        timer: 1300,
        showConfirmButton: false,
      });

      if (onSaved) {
        onSaved({ ...initialPlatform, ...payload });
      }

      if (redirectOnSuccess) {
        router.push("/#featured-platforms");
      } else if (!embedded && isUpdating) {
        router.push("/dashboard/updating");
      }
    } catch (error) {
      const errorMessage =
        error?.message || "Something went wrong while saving the platform.";

      setMessage({
        text: errorMessage,
        type: "error",
      });

      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: errorMessage,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!isUpdating || !initialPlatform?.id || !supabase) {
      return;
    }

    const isAuthorized = await ensureAdminAccess();

    if (!isAuthorized) {
      return;
    }

    const result = await Swal.fire({
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete Platform",
      icon: "warning",
      showCancelButton: true,
      text: "This will permanently delete the selected platform.",
      title: "Delete this platform?",
    });

    if (!result.isConfirmed) {
      return;
    }

    setIsDeleting(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from(TABLE_NAME)
        .delete()
        .eq("id", initialPlatform.id);

      if (error) {
        throw error;
      }

      await refreshPublicPlatformCache();

      await Swal.fire({
        icon: "success",
        showConfirmButton: false,
        text: redirectOnSuccess
          ? "Redirecting back to the platforms page."
          : "The platform list has been refreshed.",
        timer: 1300,
        title: "Platform Deleted",
      });

      if (onDeleted) {
        onDeleted(initialPlatform);
      }

      if (redirectOnSuccess) {
        router.push("/platforms");
      } else if (!embedded) {
        router.push("/dashboard/updating");
      }
    } catch (error) {
      const errorMessage =
        error?.message || "Something went wrong while deleting the platform.";

      setMessage({
        text: errorMessage,
        type: "error",
      });

      Swal.fire({
        icon: "error",
        text: errorMessage,
        title: "Delete Failed",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (access.checking) {
    return (
      <main className="grid min-h-screen place-items-center bg-gray-50 px-4">
        <p className="text-sm font-medium text-gray-600">
          Checking your access...
        </p>
      </main>
    );
  }

  if (!access.authorized) {
    return (
      <main className="grid min-h-screen place-items-center bg-gray-50 px-4">
        <div className="max-w-md rounded-lg border border-red-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-gray-950">Access denied</h1>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            {access.message || "Your account is not authorized to manage platforms."}
          </p>
          <Link
            className="mt-5 inline-flex items-center justify-center rounded-lg bg-gray-950 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-gray-800"
            href="/dashboard"
          >
            Back to dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div
      className={
        embedded
          ? "bg-gray-50 px-4 pb-8 sm:px-6 lg:px-8"
          : "min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8"
      }
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {!embedded ? (
              <Link
                className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900"
                href="/dashboard"
              >
                <ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />
                Back to dashboard
              </Link>
            ) : null}
            <h1 className="text-3xl font-semibold tracking-normal text-gray-950">
              {heading}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
              {intro}
            </p>
          </div>
        </div>

        {message ? (
          <div
            className={`mb-5 rounded-lg border px-4 py-3 text-sm font-medium ${
              message.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
            role="status"
          >
            {message.text}
          </div>
        ) : null}

        <form
          className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]"
          onSubmit={handleSubmit}
        >
          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="grid gap-5 md:grid-cols-2">
              <TextInput
                error={errors.name}
                id="name"
                label="Name"
                onChange={handleNameChange}
                placeholder="Outlier AI"
                required
                value={form.name}
              />

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label className="block text-sm font-semibold text-gray-900" htmlFor="slug">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <button
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                    onClick={regenerateSlug}
                    type="button"
                  >
                    <ArrowPathIcon aria-hidden="true" className="h-3.5 w-3.5" />
                    Regenerate
                  </button>
                </div>
                <input
                  aria-invalid={errors.slug ? "true" : "false"}
                  className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 ${
                    errors.slug ? "border-red-300" : "border-gray-300"
                  }`}
                  id="slug"
                  onChange={handleSlugChange}
                  placeholder="outlier-ai"
                  required
                  value={form.slug}
                />
                <FieldError>{errors.slug}</FieldError>
              </div>

              <TextInput
                error={errors.websiteUrl}
                id="websiteUrl"
                label="Website URL"
                onChange={(event) => updateField("websiteUrl", event.target.value)}
                placeholder="https://example.com"
                required
                type="url"
                value={form.websiteUrl}
              />

              <TextInput
                error={errors.allProjectsReferralLink}
                id="allProjectsReferralLink"
                label="All Projects Referral Link"
                onChange={(event) =>
                  updateField("allProjectsReferralLink", event.target.value)
                }
                placeholder="https://example.com/referral/all-projects"
                type="url"
                value={form.allProjectsReferralLink}
              />

              <TextInput
                error={errors.image}
                id="image"
                label="Website Image URL"
                onChange={(event) => updateField("image", event.target.value)}
                placeholder="https://example.com/image.jpg"
                required
                type="url"
                value={form.image}
              />

              <TextInput
                error={errors.shortDescription}
                helperText="This text is displayed on homepage cards and platform previews."
                id="shortDescription"
                label="Short Description"
                onChange={(event) =>
                  updateField("shortDescription", event.target.value)
                }
                placeholder="Short platform overview..."
                required
                textarea
                value={form.shortDescription}
              />

              <TextInput
                error={errors.description}
                helperText="This text is displayed only on the Platform Details page."
                id="description"
                label="Full Description"
                onChange={(event) => updateField("description", event.target.value)}
                placeholder="Full platform description..."
                required
                textarea
                value={form.description}
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-900" htmlFor="category">
                    Category
                  </label>
                  <select
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition-colors focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                    id="category"
                    onChange={(event) => updateField("category", event.target.value)}
                    value={form.category}
                  >
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-900" htmlFor="categoryColor">
                    Category Color
                  </label>
                  <select
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition-colors focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                    id="categoryColor"
                    onChange={(event) => updateField("categoryColor", event.target.value)}
                    value={form.categoryColor}
                  >
                    {categoryColorOptions.map((color) => (
                      <option key={color.value} value={color.value}>
                        {color.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <TextInput
                id="countries"
                label="Countries"
                onChange={(event) => updateField("countries", event.target.value)}
                placeholder="Worldwide"
                value={form.countries}
              />

              <TextInput
                id="hourlyRate"
                label="Hourly Rate"
                onChange={(event) => updateField("hourlyRate", event.target.value)}
                placeholder="$15-$45/hr"
                value={form.hourlyRate}
              />

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900" htmlFor="rating">
                  Rating
                </label>
                <input
                  aria-invalid={errors.rating ? "true" : "false"}
                  className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-gray-900 outline-none transition-colors focus:border-gray-900 focus:ring-1 focus:ring-gray-900 ${
                    errors.rating ? "border-red-300" : "border-gray-300"
                  }`}
                  id="rating"
                  max="5"
                  min="0"
                  onChange={(event) => updateField("rating", event.target.value)}
                  step="0.1"
                  type="number"
                  value={form.rating}
                />
                <FieldError>{errors.rating}</FieldError>
              </div>

              <fieldset className="md:col-span-2">
                <legend className="mb-3 text-sm font-semibold text-gray-900">
                  Payment Methods
                </legend>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {paymentOptions.map((method) => (
                    <label
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300"
                      key={method}
                    >
                      <input
                        checked={form.payment.includes(method)}
                        className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                        onChange={() => togglePayment(method)}
                        type="checkbox"
                      />
                      {method}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="md:col-span-2">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <legend className="text-sm font-semibold text-gray-900">
                    Individual Projects
                  </legend>
                  <button
                    aria-label="Add another individual project"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
                    onClick={addReferralLink}
                    type="button"
                  >
                    <PlusIcon aria-hidden="true" className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {form.referralLinks.map((item, index) => (
                    <div
                      className="grid gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]"
                      key={index}
                    >
                      <TextInput
                        error={errors[`projectName-${index}`]}
                        id={`projectName-${index}`}
                        label="Project Name"
                        onChange={(event) =>
                          updateReferralLink(index, "projectName", event.target.value)
                        }
                        placeholder="Coding assessment"
                        value={item.projectName}
                      />

                      <TextInput
                        error={errors[`referralLink-${index}`]}
                        id={`referralLink-${index}`}
                        label="Referral Link"
                        onChange={(event) =>
                          updateReferralLink(index, "referralLink", event.target.value)
                        }
                        placeholder="https://example.com/referral"
                        type="url"
                        value={item.referralLink}
                      />

                      <div className="flex items-end gap-2">
                        <button
                          aria-label="Add another individual project"
                          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
                          onClick={addReferralLink}
                          type="button"
                        >
                          <PlusIcon aria-hidden="true" className="h-5 w-5" />
                        </button>
                        <button
                          aria-label="Remove individual project"
                          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-red-100 bg-white text-red-600 transition-colors hover:border-red-200 hover:bg-red-50"
                          onClick={() => removeReferralLink(index)}
                          type="button"
                        >
                          <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-5 md:col-span-2 md:grid-cols-2">
                <DynamicTextList
                  errors={errors}
                  items={form.requirements}
                  label="Requirements"
                  name="requirements"
                  onAdd={addTextListItem}
                  onRemove={removeTextListItem}
                  onUpdate={updateTextListItem}
                  placeholder="Requirement details"
                />

                <DynamicTextList
                  errors={errors}
                  items={form.howToPass}
                  label="How To Pass"
                  name="howToPass"
                  onAdd={addTextListItem}
                  onRemove={removeTextListItem}
                  onUpdate={updateTextListItem}
                  placeholder="Step or tip"
                />
              </div>

              <fieldset className="md:col-span-2">
                <legend className="mb-3 text-sm font-semibold text-gray-900">
                  Pros And Cons
                </legend>
                <div className="grid gap-5 md:grid-cols-2">
                  <DynamicTextList
                    errors={errors}
                    items={form.pros}
                    label="Pros"
                    name="pros"
                    onAdd={addTextListItem}
                    onRemove={removeTextListItem}
                    onUpdate={updateTextListItem}
                    placeholder="Positive point"
                  />

                  <DynamicTextList
                    errors={errors}
                    items={form.cons}
                    label="Cons"
                    name="cons"
                    onAdd={addTextListItem}
                    onRemove={removeTextListItem}
                    onUpdate={updateTextListItem}
                    placeholder="Negative point"
                  />
                </div>
              </fieldset>

              <fieldset className="md:col-span-2">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <legend className="text-sm font-semibold text-gray-900">
                    Frequently Asked
                  </legend>
                  <button
                    aria-label="Add frequently asked question"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
                    onClick={addFaqItem}
                    type="button"
                  >
                    <PlusIcon aria-hidden="true" className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {form.frequentlyAsked.map((item, index) => (
                    <div
                      className="grid gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]"
                      key={index}
                    >
                      <TextInput
                        error={errors[`faqQuestion-${index}`]}
                        id={`faqQuestion-${index}`}
                        label={`Question ${index + 1}`}
                        onChange={(event) =>
                          updateFaqItem(index, "question", event.target.value)
                        }
                        placeholder="Common question"
                        value={item.question}
                      />

                      <TextInput
                        error={errors[`faqAnswer-${index}`]}
                        id={`faqAnswer-${index}`}
                        label={`Answer ${index + 1}`}
                        onChange={(event) =>
                          updateFaqItem(index, "answer", event.target.value)
                        }
                        placeholder="Helpful answer"
                        value={item.answer}
                      />

                      <div className="flex items-end gap-2">
                        <button
                          aria-label="Add frequently asked question"
                          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
                          onClick={addFaqItem}
                          type="button"
                        >
                          <PlusIcon aria-hidden="true" className="h-5 w-5" />
                        </button>
                        <button
                          aria-label="Remove frequently asked question"
                          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-red-100 bg-white text-red-600 transition-colors hover:border-red-200 hover:bg-red-50"
                          onClick={() => removeFaqItem(index)}
                          type="button"
                        >
                          <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-base font-semibold text-gray-950">
                Image Preview
              </h2>
              <div className="grid aspect-video place-items-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                {form.image && !imageFailed ? (
                  <img
                    alt={form.name ? `${form.name} website preview` : "Website preview"}
                    className="h-full w-full object-cover"
                    onError={() => setImageFailed(true)}
                    src={form.image}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 px-6 text-center text-sm text-gray-500">
                    <PhotoIcon aria-hidden="true" className="h-8 w-8 text-gray-400" />
                    {imageFailed
                      ? "The image URL could not be loaded."
                      : "Paste a website image URL to preview it here."}
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-base font-semibold text-gray-950">
                Quick Review
              </h2>
              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-gray-500">Slug</dt>
                  <dd className="truncate font-medium text-gray-900">
                    {form.slug || "Not set"}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-gray-500">Category</dt>
                  <dd className="font-medium text-gray-900">{form.category}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-gray-500">Rating</dt>
                  <dd className="font-medium text-gray-900">{form.rating || "0"}/5</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-gray-500">Payments</dt>
                  <dd className="font-medium text-gray-900">{form.payment.length}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-gray-500">All projects link</dt>
                  <dd className="font-medium text-gray-900">
                    {form.allProjectsReferralLink.trim() ? "Set" : "Not set"}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-gray-500">Individual projects</dt>
                  <dd className="font-medium text-gray-900">
                    {
                      form.referralLinks.filter(
                        (item) => item.projectName.trim() || item.referralLink.trim()
                      ).length
                    }
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-gray-500">Requirements</dt>
                  <dd className="font-medium text-gray-900">
                    {compactTextList(form.requirements).length}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-gray-500">How to pass</dt>
                  <dd className="font-medium text-gray-900">
                    {compactTextList(form.howToPass).length}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-gray-500">FAQ</dt>
                  <dd className="font-medium text-gray-900">
                    {
                      form.frequentlyAsked.filter(
                        (item) => item.question.trim() || item.answer.trim()
                      ).length
                    }
                  </dd>
                </div>
              </dl>
            </section>

            <button
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-gray-950 px-5 text-sm font-bold text-black shadow-sm transition-colors hover:bg-light-green-400 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSaving || isDeleting}
              type="submit"
            >
              <CheckCircleIcon aria-hidden="true" className="h-5 w-5" />
              {isSaving
                ? isUpdating
                  ? "Saving Changes..."
                  : "Adding Platform..."
                : isUpdating
                  ? "Save Changes"
                  : "Add Platform"}
            </button>

            {isUpdating ? (
              <button
                className="inline-flex h-12 w-full items-center justify-center rounded-lg border border-red-200 bg-white px-5 text-sm font-bold text-red-700 shadow-sm transition-colors hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isSaving || isDeleting}
                onClick={handleDelete}
                type="button"
              >
                {isDeleting ? "Deleting Platform..." : "Delete Platform"}
              </button>
            ) : null}
          </aside>
        </form>
      </div>
    </div>
  );
}
