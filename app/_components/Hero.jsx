"use client";
import { Button } from "@/components/ui/button";
import { auth, signInWithGoogle } from "@/services/firebase";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

const Hero = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle().then((_) => {
      router.push("/dashboard");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center my-32">
      <div className="hidden md:block">
        <Image
          src="/profile1.png"
          width={100}
          height={100}
          className="h-[100px] z-[-10] object-cover rounded-full absolute top-24 right-20"
          alt="profile"
        />
        <Image
          src="/profile2.png"
          width={100}
          height={100}
          className="h-[100px] z-[-10] object-cover rounded-full absolute top-40 left-24"
          alt="profile"
        />
        <Image
          src="/profile3.png"
          width={100}
          height={100}
          className="h-[100px] z-[-10] object-cover rounded-full absolute bottom-20 left-36"
          alt="profile"
        />
        <Image
          src="/profile4.png"
          width={100}
          height={100}
          className="h-[100px] z-[-10] object-cover rounded-full absolute right-16 bottom-32"
          alt="profile"
        />
      </div>
      <div className="text-center max-w-3xl">
        <h2 className="font-bold text-[60px] text-slate-700">
          Easy Scheduling ahead
        </h2>
        <h2 className="font-xl mt-5 text-slate-700">
          Scheduly is your scheduling automation platform for eliminating the
          back-and-forth emails to find the perfect time -- and so much more
        </h2>

        {user ? (
          <Button className="mt-5" onClick={() => router.push("/dashboard")}>Dashboard</Button>
        ) : (
          <div>
            <div className="flex gap-4 flex-col mt-5">
              <div className="flex justify-center gap-8 ">
                <Button
                  className="flex items-center gap-2"
                  onClick={handleSignInWithGoogle}
                >
                  <Image
                    src="/google.png"
                    width={25}
                    height={25}
                    alt="google"
                  />
                  <span>Sign Up with Google</span>
                </Button>
              </div>
            </div>
            <hr className="mt-4 mb-2" />
            <h3>
              Already have an account?{" "}
              <Link href="/login">
                <span className="hover:text-primary hover:underline">
                  Log in
                </span>
              </Link>
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
