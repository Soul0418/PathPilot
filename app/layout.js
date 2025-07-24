import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";
import Chatbot from "@/components/Chatbot";
import Script from "next/script"; // 👈 Import this

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Career Coach",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            

            {/* ✅ Inject Chatbase Script */}
            <Script id="chatbase-embed" strategy="afterInteractive">
              {`
                (function(){
                  if(!window.chatbase || window.chatbase("getState") !== "initialized"){
                    window.chatbase = (...args) => {
                      if(!window.chatbase.q){ window.chatbase.q = [] }
                      window.chatbase.q.push(args)
                    };
                    window.chatbase = new Proxy(window.chatbase, {
                      get(target, prop){
                        if(prop === "q"){ return target.q }
                        return (...args) => target(prop, ...args)
                      }
                    });
                  }
                  const onLoad = function(){
                    const script = document.createElement("script");
                    script.src = "https://www.chatbase.co/embed.min.js";
                    script.id = "rnJtJlBZ1-X6pEHsA0MPM";
                    script.domain = "www.chatbase.co";
                    document.body.appendChild(script);
                  };
                  if(document.readyState === "complete"){
                    onLoad();
                  } else {
                    window.addEventListener("load", onLoad);
                  }
                })();
              `}
            </Script>

            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>Made with 💗 by Saksham</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
