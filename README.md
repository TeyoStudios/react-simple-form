# @teyostudios/react-simple-form

A lightweight and extensible form validation system for React, designed to simplify form logic with a clean and declarative API.

---

## ✨ Features

- ✅ Custom validation system with chained validators
- 🔄 Dynamic min/max validation based on type
- 📦 Minimal, no external dependencies
- ⚛️ Built for React 18+
- 💡 Easy to extend and customize

---

## 📦 Installation

```bash
npm install @teyostudios/react-simple-form
```

or

```bash
yarn add @teyostudios/react-simple-form
```

## 🚀 Quick Start

```typescript
import {
  RSF_Data,
  useSimpleForm,
  RSF_Input,
  RSF_FormDataTypes,
} from "@teyostudios/react-simple-form";

const name = RSF_Data({ name: "name", type: RSF_FormDataTypes.STRING })
  .setLabel("Name")
  .setPlaceholder("Enter the name here")
  .min(2, "The name must be at least 2 characters long")
  .max(100, "The name must be at most 100 characters long")
  .required("Name is required");

const address = RSF_Data({ name: "address", type: RSF_FormDataTypes.STRING })
  .setLabel("Address")
  .setPlaceholder("Enter the address here")
  .min(5, "The address must be at least 5 characters long")
  .max(200, "The address must be at most 200 characters long")
  .required("Address is required");

export default function MyForm() {
  const form = useSimpleForm([
    name,
    address,
    city,
    logo,
    bgImage,
    phone,
    email,
    schedule,
    description,
    type,
    tags,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = form.validate();

    if (!error) {
      // Data in form.values
      // Handle form submit
    } else {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <RSF_Input name="name" formData={form} type="text" />
      <RSF_Input
        name="address"
        formData={form}
        type="text"
        inputClass={"flex-1"}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## 📚 Documentation

[WIP] Full documentation and usage guide coming soon.

## 📬 Feedback & Issues

Found a bug? Have a suggestion? Open an issue on [GitHub](https://github.com/TeyoStudios/react-simple-form/issues) or contact us at [info@teyostudios.es](mailto:info@teyostudios.es)

## 📄 License

This project uses a custom license. See [LICENSE.md](./LICENSE.md) for details.

Made with ❤️ by [TeyoStudios](https://teyostudios.es)
