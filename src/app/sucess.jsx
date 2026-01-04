import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-green-600">Message sent successfully</h1>
        <p>Thank you! I will get back to you soon.</p>
        <Link href="/" className="inline-block bg-gradient-to-tr from-[#ffa45b] to-[#ff7c5b] px-6 py-3 rounded-lg text-white font-semibold">
          Go back
        </Link>
      </div>
    </div>
  );
}
