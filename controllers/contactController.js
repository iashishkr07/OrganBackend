import Contact from "../models/Contact.js";

export const submitContact = async (req, res) => {
  try {
    const { email, message } = req.body;

    // Create new contact submission
    const contact = new Contact({
      email,
      message,
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: "Message received successfully!",
      data: contact,
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting message. Please try again.",
      error: error.message,
    });
  }
};
