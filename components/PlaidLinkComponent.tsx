'use client';
import { usePlaidLink } from 'react-plaid-link';

const PlaidLinkComponent = ({ linkToken }: { linkToken: string }) => {
  const { open, ready, error } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      console.log('✅ Success:', public_token, metadata);
      // Send `public_token` to your backend here
    },
    onExit: (err, metadata) => {
      console.log('❌ Exited:', err, metadata);
    },
  });

  return (
    <button
      onClick={() => open()}
      disabled={!ready}
      className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
    >
      Connect Your Bank
    </button>
  );
};

export default PlaidLinkComponent;