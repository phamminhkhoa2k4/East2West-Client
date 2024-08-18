import { FOOTER_CONTACT_INFO, FOOTER_LINKS, GALLERY, SOCIALS } from '@/constants/constant.index'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer
     
      className="flexCenter mt-24 fill-white-500 bg-center bg-cover bg-no-repeat bg-bg-footer"
    >
      <div className="padding-container max-container flex w-full flex-col gap-14">
        <div className="flex flex-col items-start justify-center gap-[10%] md:flex-row">
          <div className="flex flex-wrap gap-10 sm:justify-between md:flex-1">
            <div>
              <Link href="/" className="mb-10">
                <Image
                  src="/Logo.png"
                  alt="logo"
                  width={181}
                  height={56}
                />
              </Link>
              <p className="mt-7 medium-20 whitespace-nowrap text-blue-70">
                Lorem ipsum dolor sit amet,
                <br /> consectetur adipiscing elit,
                <br /> sed do eiusmod tempo.
              </p>

              <ul className="mt-9 regular-14 flex gap-4 text-gray-30">
                {SOCIALS.links.map((link: any) => (
                  <Link href="/" key={link}>
                    <Image src={link} alt="logo" width={28} height={28} />
                  </Link>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                {FOOTER_CONTACT_INFO.links.map((link: any) => (
                  <Link
                    href="/"
                    key={link.label}
                    className="flex gap-4 md:flex-col lg:flex-row"
                  >
                    <p className="whitespace-nowrap">{link.label}:</p>
                    <p className="medium-14 whitespace-nowrap text-blue-70">
                      {link.value}
                    </p>
                  </Link>
                ))}
              </FooterColumn>
            </div>

            <div className="flex flex-col gap-5">
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                {FOOTER_CONTACT_INFO.links.map((link: any) => (
                  <Link
                    href="/"
                    key={link.label}
                    className="flex gap-4 md:flex-col lg:flex-row"
                  >
                    <p className="whitespace-nowrap">{link.label}:</p>
                    <p className="medium-14 whitespace-nowrap text-blue-70">
                      {link.value}
                    </p>
                  </Link>
                ))}
              </FooterColumn>
            </div>

            <div className="flex flex-col gap-5">
              <FooterColumn title={GALLERY.title}>
                <ul className="regular-14 grid gap-4 text-gray-30 grid-cols-4 grid-rows-4 ">
                  {GALLERY.links.map((link: any) => (
                    <div
                      key={link}
                      className="w-18 h-18 rounded-md overflow-hidden"
                    >
                      <Link href="/">
                        <Image src={link} alt="logo" width={100} height={100} />
                      </Link>
                    </div>
                  ))}
                </ul>
              </FooterColumn>
            </div>
          </div>
        </div>

        <div className="border bg-gray-20" />
        <p className="regular-14 w-full text-center text-gray-30">
          2023 East2West | All rights reserved
        </p>
      </div>
    </footer>
  );
};

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className='flex flex-col gap-5'>
      <h2 className='bold-20 whitespace-nowrap'>{title}</h2>
      {children}
    </div>
  );
};

export default Footer;
