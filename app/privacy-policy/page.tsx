import Footer from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and information about how we handle your data",
};

const privacyPolicy = {
  intro:
    'This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from Jewel (the "Site").',

  personalInfo: {
    title: "Personal information we collect",
    deviceInfo:
      'When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as "Device Information".',
    technologies: {
      intro: "We collect Device Information using the following technologies:",
      items: [
        '"Cookies" are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.',
        '"Log files" track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.',
        '"Web beacons", "tags", and "pixels" are electronic files used to record information about how you browse the Site.',
      ],
    },
    orderInfo:
      'Additionally when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number. We refer to this information as "Order Information".',
  },

  textMarketing: {
    title: "Text Marketing and notifications",
    content:
      "By subscribing to text notifications you agree to receive recurring automated marketing messages at the phone number provided. Consent is not a condition of purchase. Reply STOP to unsubscribe. HELP for help. Msg & Data rates may apply. More info view Privacy Policy and ToS.",
    terms: {
      title: "Text Marketing Terms and Conditions",
      content: [
        "We are using a text messaging platform, which is subject to the following terms and conditions. By opting-in for our text marketing and notifications in, you agree to these terms and conditions.",
        "By entering your phone number in the checkout and initialising a purchase, subscribing via our subscription form or a keyword, you agree that we may send you text notifications (for your order, including abandoned cart reminders) and text marketing offers. You acknowledge that consent is not a condition for any purchase.",
        'Your phone number, name and purchase information will be shared with our SMS platform "SMSBump Inc, an European Union company with office at Sofia, Bulgaria, EU. This data will be used for sending you targeted marketing messages and notifications. Upon sending the text messages, your phone number will be passed to a text messages operator to fulfill their delivery.',
        "If you wish to unsubscribe from receiving text marketing messages and notifications reply with STOP to any mobile message sent from us or use the unsubscribe link we provided you with in any of our messages. You understand and agree that alternative methods of opting out, such as using alternative words or requests will not be accounted as a reasonable means of opting out. Message and data rates may apply.",
        'For any questions please text "HELP" to the number you received the messages from. You can also contact us for more information. If you wish to opt out please follow the procedures above.',
      ],
    },
  },

  usage: {
    title: "How do we use your personal information?",
    definition:
      'When we talk about "Personal Information" in this Privacy Policy, we are talking both about Device Information and Order Information.',
    orderUse: [
      "We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:",
      "- Communicate with you;",
      "- Screen our orders for potential risk or fraud; and",
      "- When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.",
    ],
    deviceUse:
      "We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).",
  },

  sharing: {
    title: "Sharing your personal Information",
    content: [
      "We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Shopify to power our online store--you can read more about how Shopify uses your Personal Information here: https://www.shopify.com/legal/privacy. We also use Google Analytics to help us understand how our customers use the Site -- you can read more about how Google uses your Personal Information here: https://www.google.com/intl/en/policies/privacy/. You can also opt-out of Google Analytics here: https://tools.google.com/dlpage/gaoptout.",
      "Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.",
    ],
  },

  advertising: {
    title: "Behavioral advertising",
    content:
      'As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For more information about how targeted advertising works, you can visit the Network Advertising Initiative\'s ("NAI") educational page at http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.',
    optOut: {
      intro:
        "You can opt out of targeted advertising by using the links below:",
      links: [
        "Facebook: https://www.facebook.com/settings/?tab=ads",
        "Google: https://www.google.com/settings/ads/anonymous",
        "Bing: https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads",
      ],
      additional:
        "Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance's opt-out portal at: http://optout.aboutads.info/.",
    },
  },

  doNotTrack: {
    title: "Do not track",
    content:
      "Please note that we do not alter our Site's data collection and use practices when we see a Do Not Track signal from your browser.",
  },

  rights: {
    title: "Your rights",
    content: [
      "If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.",
      "Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.",
    ],
  },

  dataRetention: {
    title: "Data retention",
    content:
      "When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.",
  },

  changes: {
    title: "Changes",
    content:
      "We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.",
  },

  minors: {
    title: "Minors",
    content: "The Site is not intended for individuals under the age of 18.",
  },

  contact: {
    title: "Contact us",
    content:
      "For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by email at hello@jewelsupport.com",
  },
};

export default function PrivacyPolicy() {
  return (
    <>
      <div className="mx-auto max-w-3xl py-8 px-[15px] md:px-[50px] bg-white text-black">
        <h1 className="text-5xl font-semibold mb-8 text-center">
          Privacy Policy
        </h1>

        {/* Introduction */}
        <p className="text-gray-700 mb-8">{privacyPolicy.intro}</p>

        {/* Personal Information Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {privacyPolicy.personalInfo.title}
          </h2>
          <p className="text-gray-700 mb-4">
            {privacyPolicy.personalInfo.deviceInfo}
          </p>

          <p className="text-gray-700 mb-2">
            {privacyPolicy.personalInfo.technologies.intro}
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            {privacyPolicy.personalInfo.technologies.items.map(
              (item, index) => (
                <li key={index} className="mb-2">
                  {item}
                </li>
              )
            )}
          </ul>

          <p className="text-gray-700">
            {privacyPolicy.personalInfo.orderInfo}
          </p>
        </section>

        {/* Text Marketing Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {privacyPolicy.textMarketing.title}
          </h2>
          <p className="text-gray-700 mb-4">
            {privacyPolicy.textMarketing.content}
          </p>

          <h3 className="text-xl font-semibold mb-3">
            {privacyPolicy.textMarketing.terms.title}
          </h3>
          {privacyPolicy.textMarketing.terms.content.map((paragraph, index) => (
            <p key={index} className="text-gray-700 mb-4">
              {paragraph}
            </p>
          ))}
        </section>

        {/* Usage Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {privacyPolicy.usage.title}
          </h2>
          <p className="text-gray-700 mb-4">{privacyPolicy.usage.definition}</p>
          {privacyPolicy.usage.orderUse.map((text, index) => (
            <p key={index} className="text-gray-700 mb-2">
              {text}
            </p>
          ))}
          <p className="text-gray-700 mt-4">{privacyPolicy.usage.deviceUse}</p>
        </section>

        {/* Sharing Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {privacyPolicy.sharing.title}
          </h2>
          {privacyPolicy.sharing.content.map((paragraph, index) => (
            <p key={index} className="text-gray-700 mb-4">
              {paragraph}
            </p>
          ))}
        </section>

        {/* Advertising Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {privacyPolicy.advertising.title}
          </h2>
          <p className="text-gray-700 mb-4">
            {privacyPolicy.advertising.content}
          </p>
          <p className="text-gray-700 mb-2">
            {privacyPolicy.advertising.optOut.intro}
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            {privacyPolicy.advertising.optOut.links.map((link, index) => (
              <li key={index} className="mb-2">
                {link}
              </li>
            ))}
          </ul>
          <p className="text-gray-700">
            {privacyPolicy.advertising.optOut.additional}
          </p>
        </section>

        {/* Do Not Track Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {privacyPolicy.doNotTrack.title}
          </h2>
          <p className="text-gray-700">{privacyPolicy.doNotTrack.content}</p>
        </section>

        {/* Rights Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {privacyPolicy.rights.title}
          </h2>
          {privacyPolicy.rights.content.map((paragraph, index) => (
            <p key={index} className="text-gray-700 mb-4">
              {paragraph}
            </p>
          ))}
        </section>

        {/* Data Retention Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {privacyPolicy.dataRetention.title}
          </h2>
          <p className="text-gray-700">{privacyPolicy.dataRetention.content}</p>
        </section>

        {/* Changes Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {privacyPolicy.changes.title}
          </h2>
          <p className="text-gray-700">{privacyPolicy.changes.content}</p>
        </section>

        {/* Minors Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {privacyPolicy.minors.title}
          </h2>
          <p className="text-gray-700">{privacyPolicy.minors.content}</p>
        </section>

        {/* Contact Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {privacyPolicy.contact.title}
          </h2>
          <p className="text-gray-700">{privacyPolicy.contact.content}</p>
        </section>
      </div>
      <Footer />
    </>
  );
}
