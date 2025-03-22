"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useLoading from "../_hooks/useLoading";

const WelcomePage = () => {
  const { isLoading, setIsLoading } = useLoading();
  const router = useRouter();

  useEffect(() => {
    const logo = document.querySelector<HTMLImageElement>(".logo");
    const finwise = document.querySelector<HTMLElement>(".revealText");
    const slogan = document.querySelector<HTMLElement>(".slogan");
    const windowLoading = document.querySelector<HTMLElement>(".loadingScreen");

    setTimeout(() => {
      if (windowLoading && logo && finwise) {
        windowLoading.style.opacity = "1";
        windowLoading.style.animation = ".5s ease-in-out forwards";
        logo.style.animation = "LogoRollAnimation 3s ease-in-out forwards";
        finwise.style.animation = "RevealTextAnimation 3s ease-in-out forwards";
      }
    }, 1000);

    logo?.addEventListener("animationend", () => {
      setTimeout(() => {
        if (logo && finwise && slogan) {
          logo.style.animation = "FadeOutAnimation 1s ease-in-out forwards";
          finwise.style.animation = "FadeOutAnimation 1s ease-in-out forwards";

          setTimeout(() => {
            slogan.style.display = "block";
            slogan.style.animation =
              "SloganAnimation 0.5s ease-in-out forwards";
          }, 1000);
        }
      }, 1000);
    });

    slogan?.addEventListener("animationend", () => {
      setTimeout(() => {
        if (slogan && windowLoading) {
          slogan.style.animation = "FadeOutAnimation 0.5s ease-in-out forwards";
          windowLoading.style.animation =
            "FadeOutAnimation 2s ease-in-out forwards";
        }
      }, 2000);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    });
  }, [setIsLoading]);

  useEffect(() => {
    if (!isLoading) {
      router.push("/");
    }
  }, [isLoading, router]);
  return (
    <div className="loadingScreen">
      <Image
        className="logo"
        src="/logo.png"
        alt="logo"
        width={48}
        height={48}
      />
      <h1 className="text revealText">FinWise</h1>
      <h2 className="text slogan">Controle inteligente para suas finanças</h2>
    </div>
  );
};

export default WelcomePage;
