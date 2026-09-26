"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function AboutContent() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setTimeout(() => setInView(true), 500);
  }, []);

  return (
    <main>
      {/* About Section */}
      <section className="mt-6 py-15 bg-white">
        <div className="mx-auto max-w-285 px-4 md:px-10 xl:px-0">
          <div className="mb-16 text-center">
            <div className={`transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="mb-4 font-inter text-[48px] leading-14 font-bold tracking-[-1px] text-navy">
                Crafting Digital Experiences That Drive Results
              </h1>
              <p className="mx-auto max-w-190 text-[18px] leading-6 text-navy/72">
                We partner with businesses to create websites and digital solutions that don&apos;t just look good—they work hard to attract customers, build trust, and generate real enquiries.
              </p>
            </div>
          </div>

          <div className="items-center grid gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              <div className={`transition-all duration-1000 ease-out delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h2 className="mb-6 font-inter text-[32px] leading-10 font-bold tracking-[-0.5px] text-navy">
                  Your Success Is Our Mission
                </h2>
                <p className="mb-6 text-[18px] leading-6 text-navy/70">
                  At ORIK Webcraft, we believe every business deserves a digital presence that truly represents what makes them special. Whether you&apos;re a small local shop or a growing enterprise, we design and build websites that reflect your brand&apos;s personality while making it easy for customers to find you and get in touch.
                </p>
                <p className="text-[18px] leading-6 text-navy/70">
                  From concept to launch and beyond, we&apos;re with you every step of the way—bringing technical expertise, creative thinking, and a genuine commitment to seeing your business thrive online.
                </p>
              </div>

              <div className={`transition-all duration-1000 ease-out delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-inter text-[20px] leading-6 font-semibold text-navy mb-1">
                        Client-Focused Approach
                      </h3>
                      <p className="text-[16px] leading-6 text-navy/70">
                        We listen first, then build solutions tailored to your unique goals and audience.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-inter text-[20px] leading-6 font-semibold text-navy mb-1">
                        Modern Technology
                      </h3>
                      <p className="text-[16px] leading-6 text-navy/70">
                        Fast-loading, mobile-friendly websites built with the latest tools and best practices.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-inter text-[20px] leading-6 font-semibold text-navy mb-1">
                        Ongoing Support
                      </h3>
                      <p className="text-[16px] leading-6 text-navy/70">
                        We don&apos;t disappear after launch—we&apos;re here to help your site grow with your business.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className={`transition-all duration-1000 ease-out delay-400 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_60px_-20px_rgba(5,0,56,0.35)]">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Web developer working on laptop designing a website"
                    width={1000}
                    height={700}
                    className="object-cover w-full h-[500px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="backdrop-blur-md p-6 rounded-2xl bg-white/95 shadow-xl">
                      <div className="grid grid-cols-3 gap-6 text-center">
                        <div>
                          <div className="font-inter text-[32px] leading-9 font-extrabold text-navy">
                            100+
                          </div>
                          <div className="mt-1 text-[14px] leading-5 text-navy/70">
                            Projects Delivered
                          </div>
                        </div>
                        <div>
                          <div className="font-inter text-[32px] leading-9 font-extrabold text-navy">
                            98%
                          </div>
                          <div className="mt-1 text-[14px] leading-5 text-navy/70">
                            Client Satisfaction
                          </div>
                        </div>
                        <div>
                          <div className="font-inter text-[32px] leading-9 font-extrabold text-navy">
                            24/7
                          </div>
                          <div className="mt-1 text-[14px] leading-5 text-navy/70">
                            Support Available
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
