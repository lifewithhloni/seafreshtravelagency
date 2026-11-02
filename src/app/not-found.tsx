import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24 text-center sm:py-32">
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal-strong">Page not found</p>
      <h1 className="mt-4 text-4xl sm:text-5xl">This path doesn’t lead anywhere — yet</h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
        The page you’re looking for may have moved or doesn’t exist. Let’s get you back on your way.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/destinations" variant="ghost">
          Explore destinations
        </ButtonLink>
      </div>
    </Container>
  );
}
