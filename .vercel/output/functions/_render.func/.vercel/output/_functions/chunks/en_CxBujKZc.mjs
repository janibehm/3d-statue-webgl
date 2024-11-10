const contact = {
	title: "Contact Us"
};
const form = {
	name: "Name",
	email: "Email",
	phone: "Phone Number",
	message: "Your Message",
	submit: "Send",
	privacy: "I accept the",
	privacyLink: "privacy policy"
};
const validation = {
	name: {
		min: "Name must be at least 2 characters",
		max: "Name must be at most 50 characters",
		required: "Name is required"
	},
	email: {
		format: "Invalid email address",
		required: "Email is required"
	},
	message: {
		min: "Message must be at least 10 characters",
		max: "Message must be at most 500 characters",
		required: "Message is required"
	},
	privacy: {
		required: "You must accept the privacy policy"
	}
};
const en = {
	contact: contact,
	form: form,
	validation: validation
};

export { contact, en as default, form, validation };
