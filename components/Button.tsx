import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type ButtonProps = {
  title: string;
  icon?: string;
  variant: string;
  full?: boolean;
};

const Button = (props: ButtonProps) => {
  const { title, icon, variant, full } = props;
  return (
    <Link
      href={"/signin"}
     
      className={`flexCenter gap-3 rounded-full border 
        ${variant} ${full && 'w-full'}`}>
      {icon && <Image alt={title} src={icon} width={24} height={24} />}
      <label className='bold-16'>{title}</label>
    </Link>
  );
};

export default Button;
