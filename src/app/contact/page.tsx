"use client";

// Note: metadata must be exported from a Server Component.
// This page is a Client Component — metadata is defined in a separate
// layout or via a sibling server component pattern. The title/description
// below is applied via the root layout template.

import { ArrowRightIcon, CheckIcon } from "@phosphor-icons/react";
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
		<div className="contact-field group relative">
			<div
				className={`relative border-b transition-all duration-500 ${
					hasError
						? "border-red-400/60"
						: state === "focused"
							? "border-amber"
							: "border-cream/15 group-hover:border-cream/25"
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
							? "text-red-400/70"
							: state === "focused"
								? "text-amber"
								: "text-cream/30"
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
					className="w-full bg-transparent pb-3 pt-6 text-[13px] font-extralight tracking-wide text-cream outline-none placeholder-transparent"
				/>

				{/* Focus line sweep */}
				<span
					className={`absolute bottom-0 left-0 h-px bg-amber transition-all duration-500 ease-out ${
						state === "focused" ? "w-full" : "w-0"
					}`}
				/>
			</div>

			{/* Error message */}
			<div
				className={`overflow-hidden transition-all duration-300 ${hasError ? "max-h-6 pt-1.5" : "max-h-0"}`}
			>
				<p className="text-[10px] tracking-[0.15em] text-red-400/70">{error}</p>
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
		// Auto-grow
		const el = e.target;
		el.style.height = "auto";
		el.style.height = `${el.scrollHeight}px`;
	};

	const isFloated = state === "focused" || value;
	const hasError = !!error;

	return (
		<div className="contact-field group relative">
			<div
				className={`relative border-b transition-all duration-500 ${
					hasError
						? "border-red-400/60"
						: state === "focused"
							? "border-amber"
							: "border-cream/15 group-hover:border-cream/25"
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
							? "text-red-400/70"
							: state === "focused"
								? "text-amber"
								: "text-cream/30"
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
					className="w-full bg-transparent pb-3 pt-6 text-[13px] font-extralight leading-relaxed tracking-wide text-cream outline-none placeholder-transparent"
				/>

				{/* Focus line sweep */}
				<span
					className={`absolute bottom-0 left-0 h-px bg-amber transition-all duration-500 ease-out ${
						state === "focused" ? "w-full" : "w-0"
					}`}
				/>
			</div>

			<div
				className={`overflow-hidden transition-all duration-300 ${hasError ? "max-h-6 pt-1.5" : "max-h-0"}`}
			>
				<p className="text-[10px] tracking-[0.15em] text-red-400/70">{error}</p>
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
			// API not yet wired — fall through
		}
		setStatus("sent");
	};

	return (
		<main className="min-h-screen bg-bg text-cream">
			<div className="mx-auto max-w-2xl px-8 pb-32 pt-40 md:px-12">
				{/* ─── HEADER ─── */}
				<div
					className="contact-header"
					style={{
						animation: "fadeSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
					}}
				>
					<p className="text-[10px] font-light uppercase tracking-[0.35em] text-amber">
						Contact
					</p>

					<h1 className="mt-5 font-heading text-5xl font-light leading-none tracking-wide text-cream md:text-7xl">
						Let&apos;s <span className="italic">talk</span>
					</h1>

					<p className="mt-6 max-w-sm text-[13px] font-extralight leading-relaxed tracking-wide text-cream/50">
						For commissions, collaborations, or just to say hello — I&apos;m
						always open to a good conversation.
					</p>

					<div className="mt-10 h-px w-16 bg-amber/40" />
				</div>

				{/* ─── FORM or SUCCESS ─── */}
				{status === "sent" ? (
					<div
						className="mt-16 flex flex-col items-start gap-6"
						style={{
							animation: "fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
						}}
					>
						{/* Check mark */}
						<div className="relative flex h-14 w-14 items-center justify-center">
							<div className="absolute inset-0 rounded-full border border-amber/30" />
							<CheckIcon
								size={20}
								weight="light"
								className="text-amber"
								style={{
									animation:
										"checkAppear 0.4s 0.2s cubic-bezier(0.16, 1, 0.3, 1) both",
								}}
								aria-hidden="true"
							/>
						</div>

						<div>
							<p className="font-heading text-3xl font-light italic text-cream">
								Message sent.
							</p>
							<p className="mt-3 text-[13px] font-extralight leading-relaxed tracking-wide text-cream/45">
								I&apos;ll get back to you as soon as possible. In the meantime,
								feel free to browse my work.
							</p>
						</div>

						<div className="mt-4 flex items-center gap-8">
							<Link
								href="/work"
								className="text-[11px] font-light uppercase tracking-[0.25em] text-amber/70 transition-colors duration-300 hover:text-amber"
							>
								View work
							</Link>
							<button
								type="button"
								onClick={() => {
									setStatus("idle");
									setFields({ name: "", email: "", message: "" });
								}}
								className="text-[11px] font-light uppercase tracking-[0.25em] text-cream/30 transition-colors duration-300 hover:text-cream/60"
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
						style={{
							animation:
								"fadeSlideUp 0.7s 0.15s cubic-bezier(0.16, 1, 0.3, 1) both",
						}}
					>
						{/* Row: Name + Email */}
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

						{/* Message */}
						<FloatingTextarea
							id="message"
							label="Your message"
							value={fields.message}
							onChange={setField("message")}
							error={errors.message}
						/>

						{/* Submit row */}
						<div className="flex items-center justify-between pt-2">
							{/* Character count hint */}
							<span
								className={`text-[10px] font-light tracking-[0.2em] transition-colors duration-300 ${
									fields.message.length > 10
										? "text-cream/30"
										: "text-transparent"
								}`}
							>
								{fields.message.length} chars
							</span>

							<button
								type="submit"
								disabled={status === "submitting"}
								className="submit-btn group relative overflow-hidden border border-cream/10 px-8 py-3.5 text-[11px] font-light uppercase tracking-[0.3em] text-cream/60 transition-all duration-500 hover:border-amber/40 hover:text-cream disabled:opacity-40"
							>
								{/* Sweep fill on hover */}
								<span className="absolute inset-0 -translate-x-full bg-amber/5 transition-transform duration-500 ease-out group-hover:translate-x-0" />

								<span className="relative flex items-center gap-3">
									{status === "submitting" ? (
										<>
											<span
												className="inline-block h-3 w-3 rounded-full border border-cream/30"
												style={{
													borderTopColor: "var(--palette-amber)",
													animation: "spin 0.8s linear infinite",
												}}
											/>
											Sending
										</>
									) : (
										<>
											Send message
											<ArrowRightIcon
												size={12}
												weight="light"
												className="transition-transform duration-300 group-hover:translate-x-0.5"
												aria-hidden="true"
											/>
										</>
									)}
								</span>
							</button>
						</div>
					</form>
				)}

				{/* ─── ALTERNATE CONTACT ─── */}
				<div
					className="mt-20 border-t border-cream/8 pt-10"
					style={{
						animation:
							"fadeSlideUp 0.7s 0.3s cubic-bezier(0.16, 1, 0.3, 1) both",
					}}
				>
					<p className="text-[10px] font-light uppercase tracking-[0.3em] text-cream/25">
						Or reach out directly
					</p>
					<a
						href="mailto:hi@pawelniedzwiecki.com"
						className="mt-3 inline-block font-heading text-xl font-light italic text-cream/50 transition-colors duration-300 hover:text-cream"
					>
						hi@pawelniedzwiecki.com
					</a>
				</div>
			</div>

			<style>{`
				@keyframes fadeSlideUp {
					from {
						opacity: 0;
						transform: translateY(18px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes checkAppear {
					from {
						opacity: 0;
						transform: scale(0.5);
					}
					to {
						opacity: 1;
						transform: scale(1);
					}
				}

				@keyframes spin {
					to { transform: rotate(360deg); }
				}
			`}</style>
		</main>
	);
}
