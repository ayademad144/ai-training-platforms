export default function RouteStatus({
  children,
  description,
  isLoading = false,
  title,
}) {
  return (
    <main
      className="flex min-h-[70vh] items-center justify-center bg-white px-4 py-20 sm:px-6 lg:px-8"
      id="main-content"
    >
      <section
        aria-labelledby="route-status-title"
        aria-live={isLoading ? "polite" : undefined}
        className="mx-auto max-w-lg text-center"
        role={isLoading ? "status" : undefined}
      >
        <h1
          className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          id="route-status-title"
        >
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
        {children ? <div className="mt-8">{children}</div> : null}
      </section>
    </main>
  );
}
