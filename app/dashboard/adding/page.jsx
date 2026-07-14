import PlatformForm from "./platform-form";

export const metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: "Add Platform",
};

export default function AddPlatformPage() {
  return <PlatformForm mode="create" />;
}
