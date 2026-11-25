import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-[1400px] flex-col justify-center px-5 pt-24 md:px-10">
      <h1 className="text-[clamp(3rem,9vw,8rem)] font-medium leading-[0.9] tracking-[-0.055em]">Page not found</h1>
      <p className="mt-6 max-w-md text-lg text-muted">That page doesn&apos;t exist, but the work does.</p>
      <div className="mt-10">
        <Button href="/#experience">Back to the work</Button>
      </div>
    </section>
  );
}
