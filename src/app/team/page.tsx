"use client";

import { useEffect, useState } from "react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio?: string;
  photo?: string;
  links?: Array<{
    platform: string;
    url: string;
  }>;
  email?: string;
  whatsapp?: string;
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add Font Awesome for icons
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);

    // Remove link icon on hover using CSS
    const style = document.createElement('style');
    style.textContent = `
      .user_social a::after {
        display: none !important;
      }
      .user_social a {
        text-decoration: none !important;
      }
    `;
    document.head.appendChild(style);

    // Fetch team members from API
    const fetchTeamMembers = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
        const response = await fetch(`${apiUrl}/api/content/`);
        const data = await response.json();

        if (data.team && Array.isArray(data.team)) {
          setTeamMembers(data.team);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);

  const getSocialIcon = (platform: string) => {
    const platformLower = platform.toLowerCase();
    if (platformLower === 'linkedin') return 'fab fa-linkedin-in';
    if (platformLower === 'facebook') return 'fab fa-facebook-f';
    if (platformLower === 'instagram') return 'fab fa-instagram';
    if (platformLower === 'twitter') return 'fab fa-twitter';
    if (platformLower === 'whatsapp') return 'fab fa-whatsapp';
    return 'fas fa-link';
  };

  return (
    <>
      <style jsx global>{`
        main {
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
        }

        .header-design {
          background-color: #4CAF50;
          background-image: linear-gradient(326deg, #4CAF50 0%, #087f23 74%);
          height: 120px;
          text-align: center;
          position: relative;
        }

        .listar-map-button {
          width: 100%;
          position: absolute;
          display: table;
          right: 0;
          top: 0;
          height: 200px;
          line-height: 164px;
          white-space: nowrap;
          font-size: 0;
        }

        .listar-map-button-text {
          display: inline-block;
          opacity: 1;
        }

        .listar-map-button-text span {
          position: relative;
          display: inline-block;
          vertical-align: middle;
          font-size: 15px;
          height: 44px;
          line-height: 1.6;
          padding: 10px 25px;
          box-shadow: 0 0 31px rgba(0, 0, 0, 0.65), 0 0 4px rgba(0, 0, 0, 0.06);
          border-radius: 50px;
          background-color: #fff;
          color: #252525;
          text-shadow: none;
          transition: all 0.2s ease-in;
        }

        .listar-map-button-text span:after {
          content: "";
          position: absolute;
          top: -14px;
          left: -14px;
          width: calc(100% + 28px);
          height: calc(100% + 28px);
          border-radius: 36px;
          border: 12px solid #fff;
        }

        .footer-wave {
          max-width: 102%;
          width: 100%;
          height: 187.8px;
          left: 0;
          z-index: 1;
          bottom: -67px;
          background: url(https://1.bp.blogspot.com/-NYl6L8pz8B4/XoIVXwfhlNI/AAAAAAAAU3k/nxJKiLT706Mb7jUFiM5vdCsOSNnFAh0yQCLcBGAsYHQ/s1600/hero-wave.png) repeat-x;
          animation: wave 10s cubic-bezier(0.44, 0.66, 0.67, 0.37) infinite;
          position: relative;
        }

        @keyframes wave {
          0% {
            background-position: 0;
          }
          100% {
            background-position: 1440px;
          }
        }

        .mainbg {
          background-color: #f5f5f5;
          padding: 120px 20px 0 20px;
          margin-bottom: 0;
        }

        .mt-10 {
          margin-top: 120px;
          margin-bottom: 0;
        }

        .user-main {
          background-color: white;
          width: 100%;
          max-width: 500px;
          min-height: 350px;
          border-radius: 10px;
          display: inline-block;
          padding: 100px 30px 80px;
          transition: 0.4s all ease-in-out;
          box-shadow: 0 12px 43px 0 rgba(0, 0, 0, 0.13);
          position: relative;
        }

        .user-main:hover {
          box-shadow: 0 23px 43px 0 rgba(0, 0, 0, 0.26);
        }

        .user-img {
          width: 200px;
          height: 200px;
          overflow: hidden;
          border-radius: 100%;
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
        }

        .user-img:after {
          position: absolute;
          content: "";
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          opacity: 0;
          visibility: hidden;
          border-radius: 100%;
          border: 3px solid #4CAF50;
          z-index: 1;
          transition: 0.3s all ease-in-out;
        }

        .user-main:hover .user-img::after {
          opacity: 1;
          visibility: visible;
        }

        .user-img svg {
          padding: 10px;
          background-image: radial-gradient(
            circle at bottom left,
            rgb(242, 242, 242) 0%,
            rgb(242, 242, 242) 6%,
            rgb(238, 238, 238) 6%,
            rgb(238, 238, 238) 15%,
            rgb(234, 234, 234) 15%,
            rgb(234, 234, 234) 47%,
            rgb(230, 230, 230) 47%,
            rgb(230, 230, 230) 54%,
            rgb(225, 225, 225) 54%,
            rgb(225, 225, 225) 56%,
            rgb(221, 221, 221) 56%,
            rgb(221, 221, 221) 90%,
            rgb(217, 217, 217) 90%,
            rgb(217, 217, 217) 100%
          );
        }

        .user-headline h3 {
          font-size: 24px;
          padding-bottom: 8px;
          text-align: center;
          font-weight: 600;
        }

        .user-designation {
          font-size: 16px;
          font-weight: 500;
          color: #087f23;
          display: block;
          text-align: center;
          margin-bottom: 5px;
        }

        .user_contact {
          padding-top: 20px;
          text-align: center;
          margin-bottom: 10px;
        }

        .user_contact span {
          font-size: 15px;
          color: #737272;
          display: block;
          margin-bottom: 8px;
        }

        .user_contact span i {
          color: #4CAF50;
          margin-right: 8px;
        }

        .user_social {
          bottom: 15px;
          right: 15px;
          position: absolute;
          z-index: 0;
        }

        .user_social ul {
          opacity: 0;
          margin-bottom: 15px;
          font-size: 14px;
          padding-top: 10px;
          visibility: hidden;
          position: relative;
          top: -50px;
          transition: 0.3s all ease-in-out;
          margin: 0;
          padding: 0;
        }

        .user-main:hover .user_social ul {
          top: 0;
          transition-delay: 0.5s;
          opacity: 1;
          visibility: visible;
        }

        .user_social ul li {
          list-style: none;
          display: block;
          color: #fff;
          text-align: center;
          margin-top: 15px;
          transition: 0.3s all ease-in-out;
        }

        .user_social li a {
          color: #fff !important;
          text-align: center;
          margin-top: 15px;
          transition: 0.3s all ease-in-out;
          cursor: pointer;
        }

        .s2-share_btn {
          height: 50px;
          width: 50px;
          line-height: 50px;
          border-radius: 100%;
          transition: 0.3s all ease-in-out;
          background-color: #4CAF50;
          cursor: pointer;
        }

        .user-main:hover .s2-share_btn {
          background-color: #66BB6A;
        }

        .s2-share_btn i {
          color: #fff;
        }

        .user_social::after {
          bottom: 20px;
          z-index: -1;
          content: "";
          width: 50px;
          height: 0%;
          opacity: 0;
          border-radius: 35px;
          position: absolute;
          visibility: hidden;
          background-color: #087f23;
          transition: 0.5s all ease-in-out;
          background-image: radial-gradient(
            circle at top right,
            rgb(12, 119, 35) 0%,
            rgb(12, 119, 35) 48%,
            rgb(36, 149, 60) 48%,
            rgb(36, 149, 60) 53%,
            rgb(60, 178, 85) 53%,
            rgb(60, 178, 85) 56%,
            rgb(76, 208, 105) 56%,
            rgb(76, 208, 105) 69%,
            rgb(102, 237, 130) 69%,
            rgb(102, 237, 130) 100%
          );
        }

        .user-main:hover .user_social::after {
          height: 100%;
          bottom: 0;
          opacity: 1;
          visibility: visible;
        }

        .user-main ::selection {
          color: #fff;
          background-color: #4CAF50;
        }
      `}</style>

      <main className="mb-0">
        <header className="header-design">
          <div className="listar-map-button">
            <div className="listar-map-button-text">
              <span className="icon-map2">OUR TEAM MEMBERS</span>
            </div>
          </div>
          <div className="footer-wave"></div>
        </header>

        <section className="mainbg">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                <p className="mt-4 text-gray-600">Loading team members...</p>
              </div>
            ) : teamMembers.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">No team members available at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center max-w-[1400px] mx-auto">
                {teamMembers.map((member) => (
                  <div key={member.id} className="mt-10">
                    <div className="user-main">
                      <div className="user-img">
                        {member.photo ? (
                          <img
                            src={member.photo.startsWith('http') ? member.photo : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}${member.photo}`}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <svg
                            id="Layer_1"
                            enableBackground="new 0 0 480.001 480.001"
                            height="100%"
                            viewBox="0 0 480.001 480.001"
                            width="100%"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="m394 424.52v39.48c0 4.42-3.58 8-8 8h-292c-4.42 0-8-3.58-8-8v-39.48c0-41.24 33.74-73.95 74.98-74.35 22.893-.243 41.02-18.798 41.02-41.34v-6.83l.15-.37c-35.9-14.86-61.15-50.23-61.15-91.5v-3.13c-14.255 0-25-11.265-25-24.54v-97.46c0-14.91 12.09-27 27-27 12.073-30.183 41.322-50 73.85-50h68.15c44.18 0 80 35.82 80 80v93.01c0 14.318-11.605 25.99-26 25.99v3.13c0 41.27-25.25 76.64-61.15 91.5l.15.37v6.83c0 22.622 18.205 41.097 41.02 41.34 41.24.4 74.98 33.11 74.98 74.35z"
                              fill="#ffd6a6"
                            />
                            <path
                              d="m394 424.52v39.48c0 4.42-3.58 8-8 8h-292c-4.42 0-8-3.58-8-8v-39.48c0-41.24 33.74-73.95 74.98-74.35 13.63-.145 25.99-6.851 33.57-17.67 34.762 38.63 26.765 29.742 39.5 43.9 3.18 3.53 8.72 3.53 11.9 0 11.419-12.696 2.097-2.336 39.5-43.9 7.555 10.783 19.895 17.525 33.57 17.67 41.24.4 74.98 33.11 74.98 74.35z"
                              fill="#d6f4fc"
                            />
                            <path
                              d="m328.659 144.58c5.136-1.603 10.346 2.253 10.35 7.633.007 8.591-.009 22.239-.009 57.917 0 54.696-44.348 99-99 99-54.65 0-99-44.302-99-99 0-18.251-.184-31.218-.25-42.39-.2-31.06 28.55-55.34 60.25-47.74 28.4 6.81 38.25 20.51 73 28 19.708 4.252 38.54 1.611 54.659-3.42z"
                              fill="#ffdfba"
                            />
                            <path
                              d="m365 88v93.01c0 14.329-11.607 25.99-26 25.99 0-30.519.016-46.34.009-54.787-.005-5.38-5.215-9.236-10.35-7.633-16.12 5.031-34.951 7.672-54.659 3.42-34.75-7.49-44.6-21.19-73-28-31.7-7.6-60.45 16.68-60.25 47.74.06 10.21.23 22.97.25 39.26-14.255 0-25-11.265-25-24.54v-97.46c0-14.91 12.09-27 27-27 12.073-30.184 41.323-50 73.85-50h68.15c44.183 0 80 35.817 80 80z"
                              fill="#42434d"
                            />
                          </svg>
                        )}
                      </div>

                      <div className="user-name">
                        <div className="user-headline">
                          <h3>{member.name}</h3>
                          <span className="user-designation">{member.role}</span>
                          <div className="user_contact">
                            {member.whatsapp && (
                              <span>
                                <i aria-hidden="true" className="fas fa-phone"></i>
                                {member.whatsapp}
                              </span>
                            )}
                            {member.email && (
                              <span>
                                <i aria-hidden="true" className="fas fa-envelope"></i>
                                {member.email}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {member.links && member.links.length > 0 && (
                        <div className="user_social ul-li-block">
                          <ul>
                            {member.links
                              .filter(link => ['linkedin', 'facebook', 'instagram'].includes(link.platform.toLowerCase()))
                              .map((link, idx) => (
                                <li key={idx}>
                                  <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${member.name}'s ${link.platform}`}
                                  >
                                    <i aria-hidden="true" className={getSocialIcon(link.platform)}></i>
                                  </a>
                                </li>
                              ))}
                          </ul>
                          <div className="s2-share_btn text-center">
                            <i className="fas fa-share-alt"></i>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
