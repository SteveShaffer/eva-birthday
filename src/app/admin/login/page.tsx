"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="card text-center" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>Admin Login</h1>
        <p style={{ marginBottom: '32px', color: 'var(--color-text-light)' }}>
          Only authorized users can access the administration dashboard.
        </p>
        
        {error && (
          <div className="error mb-3" style={{ backgroundColor: 'rgba(231, 29, 54, 0.1)', color: 'var(--color-accent)', padding: '12px', borderRadius: '8px' }}>
            {error === "AccessDenied" 
              ? "You are not authorized to access this page." 
              : "An error occurred during sign in."}
          </div>
        )}

        <button 
          onClick={() => signIn("google", { callbackUrl: "/admin" })}
          className="btn btn-primary"
          style={{ width: '100%' }}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
