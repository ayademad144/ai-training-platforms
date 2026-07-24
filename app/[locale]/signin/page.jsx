import { Basic } from "./components/Basic";

export const metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <Basic />
      </div>
    </div>
  );
}
