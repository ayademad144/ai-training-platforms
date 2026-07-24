"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

export function ReferralClicksCard() {
  const t = useTranslations("Dashboard");

  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <svg
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125C16.5 3.504 17.004 3 17.625 3h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <Typography className="mb-2" color="blue-gray" variant="h5">
          {t("referralClicksTitle")}
        </Typography>
        <Typography>
          {t("referralClicksDescription")}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Link className="inline-block" href="/dashboard/referral-clicks">
          <Button className="flex items-center gap-2" size="sm" variant="text">
            {t("viewClicks")}
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
