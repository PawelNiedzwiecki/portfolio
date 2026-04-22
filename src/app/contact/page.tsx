"use client";

import { CheckIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

type FieldState = "idle" | "focused" | "filled" | "error";

interface Field {
	name: string;
	email: string;
	message: string;
}

interface FieldErrors {
	name?: string;
	email?: string;
	message?: string;
}

function FloatingInput({
	id,
	label,
	type = "text",
	value,
	onChange,
	error,
	autoComplete,
}: {
	id: string;
	label: string;
	type?: string;
	value: string;
	onChange: (val: string) => void;
	error?: string;
	autoComplete?: string;
}) {
	const [state, setState] = useState<FieldState>("idle");

	const handleFocus = () => setState("focused");
	const handleBlur = () => setState(value ? "filled" : "idle");

	const isFloated = state === "focused" || value;
	const hasError = !!error;

	return (
		<div className="group relative">
			<div
				className={`relative border-b transition-all duration-300 ${
					hasError
						? "border-red-500/60"
						: state === "focused"
							? "border-fg"
							: "border-fg/40 group-hover:border-fg/70"
				}`}
			>
				<label
					htmlFor={id}
					className={`pointer-events-none absolute left-0 transition-all duration-300 ease-out ${
						isFloated
							? "top-0 text-[9px] tracking-[0.4em]"
							: "top-4 text-[12px] tracking-[0.2em]"
					} font-light uppercase ${
						hasError
							? "text-red-500/70"
							: state === "focused"
								? "text-fg"
								: "text-fg/60"
					}`}
				>
					{label}
				</label>
				<input
					id={id}
					name={id}
					type={type}
					value={value}
					autoComplete={autoComplete}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onChange={(e) => onChange(e.target.value)}
					className="w-full bg-transparent pb-3 pt-6 text-[13px] tracking-wide text-fg outline-none placeholder-transparent"
				/>
				<span
					className={`absolute bottom-0 left-0 h-px bg-fg transition-all duration-300 ease-out ${
						state === "focused" ? "w-full" : "w-0"
					}`}
				/>
			</div>
			<div
				className={`overflow-hidden transition-all duration-300 ${hasError ? "max-h-6 pt-1.5" : "max-h-0"}`}
			>
				<p className="text-[10px] tracking-[0.15em] text-red-500/70">{error}</p>
			</div>
		</div>
	);
}

function FloatingTextarea({
	id,
	label,
	value,
	onChange,
	error,
}: {
	id: string;
	label: string;
	value: string;
	onChange: (val: string) => void;
	error?: string;
}) {
	const [state, setState] = useState<FieldState>("idle");
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleFocus = () => setState("focused");
	const handleBlur = () => setState(value ? "filled" : "idle");

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		onChange(e.target.value);
		const el = e.target;
		el.style.height = "auto";
		el.style.height = `${el.scrollHeight}px`;
	};

	const isFloated = state === "focused" || value;
	const hasError = !!error;

	return (
		<div className="group relative">
			<div
				className={`relative border-b transition-all duration-300 ${
					hasError
						? "border-red-500/60"
						: state === "focused"
							? "border-fg"
							: "border-fg/40 group-hover:border-fg/70"
				}`}
			>
				<label
					htmlFor={id}
					className={`pointer-events-none absolute left-0 transition-all duration-300 ease-out ${
						isFloated
							? "top-0 text-[9px] tracking-[0.4em]"
							: "top-4 text-[12px] tracking-[0.2em]"
					} font-light uppercase ${
						hasError
							? "text-red-500/70"
							: state === "focused"
								? "text-fg"
								: "text-fg/60"
					}`}
				>
					{label}
				</label>
				<textarea
					ref={textareaRef}
					id={id}
					name={id}
					rows={1}
					value={value}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onChange={handleChange}
					style={{ minHeight: "52px", resize: "none", overflow: "hidden" }}
					className="w-full bg-transparent pb-3 pt-6 text-[13px] leading-relaxed tracking-wide text-fg outline-none placeholder-transparent"
				/>
				<span
					className={`absolute bottom-0 left-0 h-px bg-fg transition-all duration-300 ease-out ${
						state === "focused" ? "w-full" : "w-0"
					}`}
				/>
			</div>
			<div
				className={`overflow-hidden transition-all duration-300 ${hasError ? "max-h-6 pt-1.5" : "max-h-0"}`}
			>
				<p className="text-[10px] tracking-[0.15em] text-red-500/70">{error}</p>
			</div>
		</div>
	);
}

export default function Contact() {
	const [fields, setFields] = useState<Field>({
		name: "",
		email: "",
		message: "",
	});
	const [errors, setErrors] = useState<FieldErrors>({});
	const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

	const setField = useCallback(
		(key: keyof Field) => (val: string) => {
			setFields((prev) => ({ ...prev, [key]: val }));
			if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }));
		},
		[errors],
	);

	const validate = (): boolean => {
		const newErrors: FieldErrors = {};
		if (!fields.name.trim()) newErrors.name = "Your name is required";
		if (!fields.email.trim()) newErrors.email = "Email address is required";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
			newErrors.email = "Please enter a valid email";
		if (!fields.message.trim()) newErrors.message = "A message is required";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validate()) return;
		setStatus("submitting");
		try {
			await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(fields),
			});
		} catch {
			// fall through
		}
		setStatus("sent");
	};

	return (
		<main className="min-h-screen">
			<div className="mx-auto max-w-2xl px-8 pb-32 pt-36 md:px-12">
				<div>
					<p className="text-[10px] font-light uppercase tracking-[0.35em] text-fg/40">
						Contact
					</p>

					<h1 className="mt-4 font-heading text-5xl font-light leading-none tracking-wide text-fg md:text-7xl">
						Let&apos;s <span className="italic">talk</span>
					</h1>

					<p className="mt-6 max-w-sm text-[13px] font-light leading-relaxed tracking-wide text-fg/50">
						For commissions, collaborations, or just to say hello — I&apos;m
						always open to a good conversation.
					</p>

					<div className="mt-8 h-px w-12 bg-fg/15" />
				</div>

				{status === "sent" ? (
					<div className="mt-16 flex flex-col items-start gap-6">
						<div className="relative flex h-14 w-14 items-center justify-center">
							<div className="absolute inset-0 rounded-full border border-fg/20" />
							<CheckIcon
								size={20}
								weight="light"
								className="text-fg/60"
								aria-hidden="true"
							/>
						</div>

						<div>
							<p className="font-heading text-3xl font-light italic text-fg">
								Message sent.
							</p>
							<p className="mt-3 text-[13px] font-light leading-relaxed tracking-wide text-fg/45">
								I&apos;ll get back to you as soon as possible. In the meantime,
								feel free to browse my work.
							</p>
						</div>

						<div className="mt-4 flex items-center gap-8">
							<Link
								href="/"
								className="text-[11px] font-light uppercase tracking-[0.25em] text-fg/50 underline-offset-4 transition-colors duration-300 hover:text-fg hover:underline"
							>
								View work
							</Link>
							<button
								type="button"
								onClick={() => {
									setStatus("idle");
									setFields({ name: "", email: "", message: "" });
								}}
								className="text-[11px] font-light uppercase tracking-[0.25em] text-fg/30 transition-colors duration-300 hover:text-fg/60"
							>
								Send another
							</button>
						</div>
					</div>
				) : (
					<form
						onSubmit={handleSubmit}
						noValidate
						className="mt-14 flex flex-col gap-10"
					>
						<div className="grid gap-10 sm:grid-cols-2">
							<FloatingInput
								id="name"
								label="Your name"
								value={fields.name}
								onChange={setField("name")}
								error={errors.name}
								autoComplete="name"
							/>
							<FloatingInput
								id="email"
								label="Email address"
								type="email"
								value={fields.email}
								onChange={setField("email")}
								error={errors.email}
								autoComplete="email"
							/>
						</div>

						<FloatingTextarea
							id="message"
							label="Your message"
							value={fields.message}
							onChange={setField("message")}
							error={errors.message}
						/>

						<div className="flex items-center justify-end pt-2">
							<button
								type="submit"
								disabled={status === "submitting"}
								className="border border-fg/15 px-8 py-3.5 text-[11px] font-light uppercase tracking-[0.3em] text-fg/50 transition-all duration-300 hover:border-fg/40 hover:text-fg disabled:opacity-40"
							>
								{status === "submitting" ? (
									<span className="flex items-center gap-3">
										<span
											className="inline-block h-3 w-3 rounded-full border border-fg/30"
											style={{
												borderTopColor: "var(--palette-fg)",
												animation: "spin 0.8s linear infinite",
											}}
										/>
										Sending
									</span>
								) : (
									"Send message"
								)}
							</button>
						</div>
					</form>
				)}

				<div className="mt-20 border-t border-fg/10 pt-10">
					<p className="text-[10px] font-light uppercase tracking-[0.3em] text-fg/25">
						Or reach out directly
					</p>
					<a
						href="mailto:hi@pawelniedzwiecki.com"
						className="mt-3 inline-block font-heading text-xl font-light italic text-fg/50 transition-colors duration-300 hover:text-fg"
					>
						hi@pawelniedzwiecki.com
					</a>
				</div>
			</div>

			<style>{`
				@keyframes spin {
					to { transform: rotate(360deg); }
				}
			`}</style>
		</main>
	);
}
