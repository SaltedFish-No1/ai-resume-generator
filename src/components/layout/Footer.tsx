export default function Footer() {
    return (
        <footer className="w-full px-6 py-10 text-sm text-center bg-surface text-muted border-t border-border">
            <div className="mb-2">
                &copy; 2024 AI Resume Generator
            </div>
            <div>
                Built by{' '}
                <a
                    href="https://github.com/SaltedFish-No1"
                    className="underline hover:text-primary transition"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Haotian Chen
                </a>
            </div>
        </footer>
    )
}
