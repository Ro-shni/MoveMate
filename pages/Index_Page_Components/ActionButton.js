// components/ActionButton.js

import React from 'react';
import tw from 'tailwind-styled-components';
import Link from 'next/link'; // Import Link from Next.js

const ActionButton = ({ src, type, label }) => {
  return (
    <Link href={type === "Status" ? "/status" : "/search"} passHref>
      <Button>
        <Image src={src} alt={type} />
        <Label>{label}</Label>
      </Button>
    </Link>
  );
};

// Styled components
const Button = tw.div`
  flex items-center justify-center cursor-pointer flex-col text-center
`;

const Image = tw.img`
  w-16 h-16 mb-2
`;

const Label = tw.span`
  text-sm font-medium
`;

export default ActionButton;


