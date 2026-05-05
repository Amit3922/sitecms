import type { ContentSchema, Template } from "./types"

export const schemas: Record<Template, ContentSchema> = {
  restaurant: {
    sections: [
      {
        title: "Hero",
        fields: [
          { key: "hero_title", label: "Main Title", type: "text", placeholder: "Best Pizza in Town" },
          { key: "hero_subtitle", label: "Subtitle", type: "textarea", placeholder: "Fresh ingredients, made with love." },
        ],
      },
      {
        title: "Contact",
        fields: [
          { key: "address", label: "Address", type: "text", placeholder: "123 Main St, Miami FL" },
          { key: "phone", label: "Phone", type: "phone", placeholder: "+1 (555) 000-0000" },
          { key: "email", label: "Email", type: "email", placeholder: "hello@restaurant.com" },
          { key: "hours", label: "Opening Hours", type: "textarea", placeholder: "Mon–Fri: 11am–10pm\nSat–Sun: 12pm–11pm" },
        ],
      },
      {
        title: "Menu Pricing",
        fields: [
          { key: "menu_item_1_name", label: "Item 1 Name", type: "text", placeholder: "Margherita Pizza" },
          { key: "menu_item_1_price", label: "Item 1 Price", type: "price", placeholder: "$12.99" },
          { key: "menu_item_2_name", label: "Item 2 Name", type: "text", placeholder: "Pasta Carbonara" },
          { key: "menu_item_2_price", label: "Item 2 Price", type: "price", placeholder: "$14.99" },
          { key: "menu_item_3_name", label: "Item 3 Name", type: "text", placeholder: "Tiramisu" },
          { key: "menu_item_3_price", label: "Item 3 Price", type: "price", placeholder: "$6.99" },
        ],
      },
      {
        title: "About",
        fields: [
          { key: "about_text", label: "About Us", type: "textarea", placeholder: "Tell your story..." },
        ],
      },
    ],
  },

  bakery: {
    sections: [
      {
        title: "Hero",
        fields: [
          { key: "hero_title", label: "Main Title", type: "text", placeholder: "Artisan Bakery" },
          { key: "hero_subtitle", label: "Tagline", type: "text", placeholder: "Baked fresh every morning." },
        ],
      },
      {
        title: "Contact",
        fields: [
          { key: "address", label: "Address", type: "text" },
          { key: "phone", label: "Phone", type: "phone" },
          { key: "email", label: "Email", type: "email" },
          { key: "hours", label: "Opening Hours", type: "textarea" },
        ],
      },
      {
        title: "Products & Pricing",
        fields: [
          { key: "product_1_name", label: "Product 1 Name", type: "text", placeholder: "Sourdough Loaf" },
          { key: "product_1_price", label: "Product 1 Price", type: "price", placeholder: "$8.00" },
          { key: "product_2_name", label: "Product 2 Name", type: "text", placeholder: "Croissant" },
          { key: "product_2_price", label: "Product 2 Price", type: "price", placeholder: "$3.50" },
          { key: "product_3_name", label: "Product 3 Name", type: "text", placeholder: "Custom Cake" },
          { key: "product_3_price", label: "Product 3 Price", type: "price", placeholder: "From $45" },
        ],
      },
      {
        title: "About",
        fields: [
          { key: "about_text", label: "About the Bakery", type: "textarea" },
        ],
      },
    ],
  },

  salon: {
    sections: [
      {
        title: "Hero",
        fields: [
          { key: "hero_title", label: "Salon Name", type: "text", placeholder: "Luxe Hair Studio" },
          { key: "hero_subtitle", label: "Tagline", type: "text", placeholder: "Where beauty meets style." },
        ],
      },
      {
        title: "Contact",
        fields: [
          { key: "address", label: "Address", type: "text" },
          { key: "phone", label: "Phone", type: "phone" },
          { key: "email", label: "Email", type: "email" },
          { key: "hours", label: "Opening Hours", type: "textarea" },
          { key: "booking_url", label: "Booking Link", type: "url", placeholder: "https://..." },
        ],
      },
      {
        title: "Services & Pricing",
        fields: [
          { key: "service_1_name", label: "Service 1", type: "text", placeholder: "Haircut & Style" },
          { key: "service_1_price", label: "Price", type: "price", placeholder: "$55" },
          { key: "service_2_name", label: "Service 2", type: "text", placeholder: "Color & Highlights" },
          { key: "service_2_price", label: "Price", type: "price", placeholder: "$120" },
          { key: "service_3_name", label: "Service 3", type: "text", placeholder: "Blowout" },
          { key: "service_3_price", label: "Price", type: "price", placeholder: "$40" },
        ],
      },
    ],
  },

  plumber: {
    sections: [
      {
        title: "Hero",
        fields: [
          { key: "hero_title", label: "Business Name", type: "text", placeholder: "Fast Fix Plumbing" },
          { key: "hero_subtitle", label: "Tagline", type: "text", placeholder: "24/7 Emergency Service." },
        ],
      },
      {
        title: "Contact",
        fields: [
          { key: "address", label: "Service Area / Address", type: "text" },
          { key: "phone", label: "Phone", type: "phone" },
          { key: "email", label: "Email", type: "email" },
          { key: "hours", label: "Availability", type: "text", placeholder: "Available 24/7" },
        ],
      },
      {
        title: "Services & Pricing",
        fields: [
          { key: "service_1_name", label: "Service 1", type: "text", placeholder: "Emergency Call-Out" },
          { key: "service_1_price", label: "Price", type: "price", placeholder: "$99" },
          { key: "service_2_name", label: "Service 2", type: "text", placeholder: "Pipe Repair" },
          { key: "service_2_price", label: "Price", type: "price", placeholder: "From $150" },
          { key: "service_3_name", label: "Service 3", type: "text", placeholder: "Drain Cleaning" },
          { key: "service_3_price", label: "Price", type: "price", placeholder: "$80" },
        ],
      },
    ],
  },

  generic: {
    sections: [
      {
        title: "Hero",
        fields: [
          { key: "hero_title", label: "Main Title", type: "text" },
          { key: "hero_subtitle", label: "Subtitle", type: "textarea" },
        ],
      },
      {
        title: "Contact",
        fields: [
          { key: "address", label: "Address", type: "text" },
          { key: "phone", label: "Phone", type: "phone" },
          { key: "email", label: "Email", type: "email" },
          { key: "hours", label: "Hours", type: "textarea" },
        ],
      },
      {
        title: "Pricing",
        fields: [
          { key: "service_1_name", label: "Service / Product 1", type: "text" },
          { key: "service_1_price", label: "Price", type: "price" },
          { key: "service_2_name", label: "Service / Product 2", type: "text" },
          { key: "service_2_price", label: "Price", type: "price" },
        ],
      },
      {
        title: "About",
        fields: [
          { key: "about_text", label: "About", type: "textarea" },
        ],
      },
    ],
  },
}
