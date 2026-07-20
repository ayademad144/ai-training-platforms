"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import {
  Card,
  CardBody,
  Typography,
  Avatar,
  Button,
} from "@material-tailwind/react";
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { createClient } from "@/lib/supabase/client";
import {
  getAdminAccessMessage,
  getAuthenticatedAdmin,
} from "@/lib/admin-session";

const TABLE_NAME = "platforms";

async function refreshPublicPlatformCache() {
  try {
    await fetch("/api/revalidate-platforms", {
      method: "POST",
    });
  } catch {}
}

function getPlatformKey(platform) {
  return platform?.id ?? platform?.slug;
}

function PlatformCard({ onDelete, onEdit, platform }) {
  return (
    <Card className="border border-gray-200 bg-white shadow-sm">
      <CardBody>
        <div className="flex flex-wrap items-center justify-between gap-4 xl:flex-nowrap">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar
              alt={platform.name || "Platform image"}
              className="border border-gray-200"
              size="sm"
              src={platform.image}
            />
            <div className="min-w-0">
              <Typography
                className="truncate text-base font-semibold text-gray-950"
                color="blue-gray"
                variant="h6"
              >
                {platform.name || "Untitled platform"}
              </Typography>
              <Typography
                className="truncate text-sm text-gray-600"
                color="gray"
                variant="small"
              >
                {platform.slug || "No slug"} · {platform.category || "No category"}
              </Typography>
            </div>
          </div>

          <div className="flex w-full gap-3 sm:w-auto">
            <Button
              className="flex flex-1 items-center justify-center gap-2 sm:flex-none"
              color="gray"
              onClick={onEdit}
              size="sm"
            >
              <PencilSquareIcon aria-hidden="true" className="h-4 w-4" />
              Updating
            </Button>

            <Button
              className="flex flex-1 items-center justify-center gap-2 sm:flex-none"
              color="red"
              onClick={onDelete}
              size="sm"
            >
              <TrashIcon aria-hidden="true" className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default function UpdatePlatformClient() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [access, setAccess] = useState({
    authorized: false,
    checking: true,
    message: "",
  });
  const [platforms, setPlatforms] = useState([]);
  const [status, setStatus] = useState({
    loading: true,
    message: "",
    type: "",
  });

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
    setStatus({
      loading: false,
      message: accessMessage,
      type: "error",
    });
    return false;
  }, [router, supabase]);

  const loadPlatforms = useCallback(async () => {
    const isAuthorized = await ensureAdminAccess();

    if (!isAuthorized) {
      return;
    }

    setStatus({ loading: true, message: "", type: "" });

    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        throw error;
      }

      const nextPlatforms = data || [];
      setPlatforms(nextPlatforms);
      setStatus({
        loading: false,
        message: nextPlatforms.length
          ? ""
          : "No platforms found yet. Add a platform first.",
        type: nextPlatforms.length ? "" : "error",
      });
    } catch (error) {
      setStatus({
        loading: false,
        message: error?.message || "Could not load platforms.",
        type: "error",
      });
    }
  }, [ensureAdminAccess, supabase]);

  useEffect(() => {
    loadPlatforms();
  }, [loadPlatforms]);

  const handleDelete = async (platform) => {
    if (!supabase || !platform?.id) {
      return;
    }

    const isAuthorized = await ensureAdminAccess();

    if (!isAuthorized) {
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete ${platform.name || "this platform"} permanently?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const { error } = await supabase
        .from(TABLE_NAME)
        .delete()
        .eq("id", platform.id);

      if (error) {
        throw error;
      }

      await refreshPublicPlatformCache();

      await Swal.fire({
        title: "Deleted!",
        text: "The platform has been deleted.",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });

      loadPlatforms();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error?.message || "Something went wrong while deleting.",
        icon: "error",
      });
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
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900"
          href="/dashboard"
        >
          <ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />
          Back to dashboard
        </Link>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-normal text-gray-950">
              Updating Platforms
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
              Choose a platform to update its data or remove it from Supabase.
            </p>
          </div>

          <Button
            className="flex items-center justify-center gap-2"
            color="gray"
            disabled={status.loading}
            onClick={loadPlatforms}
            size="sm"
            variant="outlined"
          >
            <ArrowPathIcon aria-hidden="true" className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {status.message ? (
          <div
            className={`mb-5 rounded-lg border px-4 py-3 text-sm font-medium ${
              status.type === "error"
                ? "border-red-200 bg-red-50 text-red-800"
                : "border-emerald-200 bg-emerald-50 text-emerald-800"
            }`}
            role="status"
          >
            {status.message}
          </div>
        ) : null}

        <section className="space-y-4">
          {status.loading ? (
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardBody>
                <Typography className="text-sm font-medium text-gray-600">
                  Loading platforms...
                </Typography>
              </CardBody>
            </Card>
          ) : null}

          {!status.loading &&
            platforms.map((platform) => (
              <PlatformCard
                key={getPlatformKey(platform)}
                onDelete={() => handleDelete(platform)}
                onEdit={() => router.push(`/dashboard/updating/${platform.slug}`)}
                platform={platform}
              />
            ))}
        </section>
      </div>
    </main>
  );
}
