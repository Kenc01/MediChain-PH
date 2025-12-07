export default function Footer() {
  return (
    <footer className="border-t bg-muted/20 py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; 2025 MediChain-PH. Built for the Philippines healthcare system.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-sm text-muted-foreground hover:underline">Privacy Policy</a>
          <a href="#" className="text-sm text-muted-foreground hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}