"use server"

import { site } from "@/lib/site"

export type InquiryState = {
  status: "idle" | "success" | "error"
  message?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const company = String(formData.get("company") ?? "").trim()
  const projectType = String(formData.get("projectType") ?? "").trim()
  const budget = String(formData.get("budget") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()

  if (!name || !email || !message) {
    return {
      status: "error",
      message: "Name, email, and a short note are required.",
    }
  }

  if (!emailPattern.test(email)) {
    return { status: "error", message: "That email does not look right." }
  }

  const payload = {
    name,
    email,
    company,
    projectType,
    budget,
    message,
  }

  const web3Key = process.env.WEB3FORMS_ACCESS_KEY

  if (web3Key) {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: web3Key,
        subject: `JJbuilds inquiry from ${name}`,
        ...payload,
      }),
    })

    if (!response.ok) {
      return {
        status: "error",
        message: `We could not send that just now. Email ${site.email}.`,
      }
    }
  } else {
    console.info("[JJbuilds inquiry]", payload)
  }

  return {
    status: "success",
    message: "Received. We will reply within two business days.",
  }
}
