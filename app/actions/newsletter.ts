"use server"

// In-memory storage (for demo only - use a database in production)
const subscribers = new Set<string>()

export async function subscribeToNewsletter(email: string) {
  try {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { success: false, message: "Invalid email address" }
    }

    // Check if already subscribed
    if (subscribers.has(email)) {
      return { success: false, message: "Email already subscribed" }
    }

    // Add to subscription list
    subscribers.add(email)

    // Simulate sending confirmation email
    console.log("[v0] Newsletter Subscription:")
    console.log("[v0] Email:", email)
    console.log("[v0] Total subscribers:", subscribers.size)
    console.log("[v0] Simulated email sent to:", email)
    console.log("[v0] Subject: Welcome to Computerz.org Newsletter!")
    console.log(
      "[v0] Body: Thank you for subscribing to our newsletter. You will receive the latest graphics card news and hardware updates.",
    )

    return {
      success: true,
      message: "Successfully subscribed! Check your email for confirmation.",
    }
  } catch (error) {
    console.error("[v0] Newsletter subscription error:", error)
    return {
      success: false,
      message: "An error occurred. Please try again.",
    }
  }
}

// Get subscriber count (optional)
export async function getSubscriberCount() {
  return subscribers.size
}
