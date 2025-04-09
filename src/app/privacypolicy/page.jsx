import React from "react";
import Footer from "../components/Footer"; // Ensure the footer component exists
import "../styles/privacypolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <header className="privacy-header">
        <h1>PRIVACY POLICY</h1>
        <p>
          Welcome to Loomiz! Your privacy is important to us. This Privacy
          Policy explains how we collect, use, disclose, and protect your
          personal information when you use our website (www.loomiz.in) and
          mobile application (collectively, the "Platform").
          <br /> <br />
          <strong>
            Effective Date: [21/03/2025] | Last Updated: [21/03/2025]
          </strong>
        </p>
      </header>

      <div className="privacy-content">
        {/* Sidebar Section */}
        <aside className="privacy-sidebar">
          <ul>
            <li>1. Introduction</li>
            <li>
              2. Information We Collect
              <ul className="sub-list">
                <li>2.1 Information You Provide to Us</li>
                <li>2.2 Information We Collect Automatically</li>
                <li>2.3 Information from Third Parties</li>
              </ul>
            </li>
            <li>3. How We Use Your Information</li>
            <li>4. How We Share Your Information</li>
            <li>5. Data Security & Retention</li>
            <li>6. Your Rights & Choices</li>
            <li>7. Cookies & Tracking Technologies</li>
            <li>8. Third-Party Links & Services</li>
            <li>9. Updates to This Policy</li>
            <li>10. Contact Us</li>
          </ul>
        </aside>

        {/* Main Content Section */}
        <main className="privacy-main">
          <section>
            <h2>1. Introduction</h2>
            <ul>
              The website www.loomiz.in (“website”) and mobile application
              ‘Loomiz’ (App) (collectively, the “platform”) is owned, operated,
              and managed by Gama Textiles Private Limited, a company
              incorporated under the Indian Companies Act, 2013, with its
              registered office at 3rd Floor, The Statement, Gurgaon, Haryana,
              122022. <br /> <br />
              Gama Textiles Private Limited ("Loomiz," "we," "us," or "our") is
              committed to protecting your privacy. This Privacy Policy outlines
              how we collect, use, and safeguard your personal information when
              you access our services through our website or mobile application.
              By using our Platform, you consent to the practices described in
              this Privacy Policy.
            </ul>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <ul>
              <h3>2.1 Information You Provide to Us</h3> <br />
              <ul>
                <li>
                  <strong>Account Information:</strong> When you register, we
                  collect your name, email address, phone number, and company
                  details.
                </li>
                <li>
                  <strong>Order & Payment Information:</strong> We collect
                  billing details, shipping addresses, and payment transaction
                  data when you place an order.
                </li>
                <li>
                  <strong>Communication Data:</strong> When you contact us for
                  support, we collect emails, messages, or other communication
                  records.
                </li>
              </ul>

              <h3>2.2 Information We Collect Automatically</h3> <br />
              <ul>
                <li>
                  <strong>Device & Usage Data:</strong> We collect device type,
                  IP address, browser type, and activity logs when you access
                  our platform.
                </li>
                <li>
                  <strong>Cookies & Tracking Technologies:</strong> We use
                  cookies and similar tracking tools to personalize your
                  experience and improve our services.
                </li>
              </ul>

              <h3>2.3 Information from Third Parties</h3> <br />
              <ul>
                <li>
                  We may receive information from third-party authentication
                  services (e.g., Google, Facebook) if you sign in via these
                  platforms.
                </li>
                <li>
                  Payment providers share transaction details necessary for
                  processing payments.
                </li>
              </ul>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <ul>
              We use your information for the following purposes: <br /> <br />
              <ul>
                <li>
                  <strong>To Provide Services:</strong> Process orders,
                  facilitate transactions, and deliver products.
                </li>
                <li>
                  <strong>To Improve User Experience:</strong> Personalize
                  services, optimize navigation, and enhance functionality.
                </li>
                <li>
                  <strong>To Communicate with You:</strong> Send updates,
                  respond to inquiries, and notify you about changes.
                </li>
                <li>
                  <strong>For Security & Fraud Prevention:</strong> Protect
                  against unauthorized access, fraud, or other illegal
                  activities.
                </li>
                <li>
                  <strong>For Legal Compliance:</strong> Meet regulatory and
                  legal requirements.
                </li>
              </ul>{" "}
            </ul>
          </section>

          <section>
            <h2>4. How We Share Your Information</h2>
            <ul>
              We do not sell or rent your personal data. However, we may share
              information with:  <br /><br />
              <ul>
                <li>
                  <strong>Service Providers:</strong> Payment processors,
                  shipping partners, and cloud hosting providers to facilitate
                  transactions.
                </li>
                <li>
                  <strong>Legal Authorities:</strong> When required to comply
                  with applicable laws, regulations, or legal processes.
                </li>
                <li>
                  <strong>Business Transfers:</strong> If Loomiz undergoes a
                  merger, acquisition, or asset sale, your data may be
                  transferred.
                </li>
              </ul>
            </ul>
          </section>

          <section>
            <h2>5. Data Security & Retention</h2>
            <ul>
              <li>
                We use encryption, firewalls, and secure access controls to
                protect your data.
              </li>
              <li>
                {" "}
                Data is stored securely and retained only as long as necessary
                for business and legal purposes.
              </li>
              <li>
                Users can request data deletion by contacting us at
                privacy@loomiz.com.
              </li>
            </ul>
          </section>

          <section>
            <h2>6. Your Rights & Choices</h2>
            <ul>
              You have the following rights over your personal data: <br /><br />
              <ul>

                <li>
                  <strong>Access & Update:</strong> View and modify your account
                  information.
                </li>
                <li>
                  <strong>Opt-Out:</strong> Manage communication preferences and
                  disable cookies.
                </li>
                <li>
                  <strong>Request Deletion:</strong> Ask us to delete your data,
                  subject to legal obligations.
                </li>
                <li>
                  <strong>Data Portability:</strong> Request a copy of your data
                  in a structured format.
                </li>
                <li>
                  To exercise these rights, contact us at privacy@loomiz.com.
                </li>
              </ul>
              <br />
              To exercise these rights, contact us at privacy@loomiz.com.
            </ul>
          </section>

          <section>
            <h2>7. Cookies & Tracking Technologies</h2>
            <ul>
              We use cookies and analytics tools to enhance user experience. You
              can manage cookies via browser settings.
            </ul>
          </section>

          <section>
            <h2>8. Third-Party Links & Services</h2>
            <ul>
              Our platform may contain links to third-party websites. We are not
              responsible for their privacy practices and encourage users to
              review their policies.
            </ul>
          </section>

          <section>
            <h2>9. Updates to This Policy</h2>
            <ul>
              We may update this Privacy Policy periodically. Changes will be
              posted on this page, and users will be notified of significant
              updates.
            </ul>
          </section>

          <section className="contactus">
            <h2>10. Contact Us</h2>
            <ul>
              For any privacy-related concerns, you can reach us at: <br />
              <strong>Gama Textiles Pvt. Ltd.</strong> <br />
              3rd Floor, The Statement, Sec-43, Gurgaon, 122022 <br />
              Email: <strong>privacy@loomiz.com</strong> <br />
              Website: www.loomiz.com
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
