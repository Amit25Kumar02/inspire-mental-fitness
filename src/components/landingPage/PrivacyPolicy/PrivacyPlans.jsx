import React, { useRef, useEffect } from "react";
import "./PrivacyPlans.css";

const Privacyplans = () => {
  const headerRef = useRef(null);
  useEffect(() => {
    headerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="container py-5 privacy-plans-section">
      <div>
        <h1 className="fs_50 ff-gotham-bold">
          Inspire Mental Fitness Privacy Policy
        </h1>
        <ul class="py-4 text-primary font-normal pb-4 border-bottom border-dark px-0">
          <li class="border-bottom d-inline-block border-primary">
            Privacy Policy
          </li>
          <br />
          <li class="border-bottom d-inline-block border-primary">
            Consumer Health Data Privacy Policy
          </li>
          <br />
          <li class="border-bottom d-inline-block border-primary">
            HIPAA Notice of Privacy Practices
          </li>
          <br />
          <li class="border-bottom d-inline-block border-primary">
            Cookie Policy
          </li>
        </ul>

        <div className="pt-4">
          <h2 className="ff-gotham-normal">Effective: November 15, 2024</h2>
          <div>
            If you are visually impaired, have another disability, or seek
            support in other languages, you may access this Privacy Policy by
            emailing us at helpdesk@inspirementalfitness.com. <br /> <br />
            As part of our company values, especially putting members first, we
            at Inspire Mental Fitness are committed to protecting and respecting
            your privacy in connection with your use of our content and products
            via our websites, including <br />
            <br />
            www.inspirementalfitness.com (“Websites”), our applications,
            including the Inspire Mental Fitness mobile app (“Apps”), or other
            delivery methods (Websites, Apps, and other delivery methods are
            collectively referred to as our “Products”). Inspire Mental Fitness
            may deliver coaching services, psychotherapy services (i.e.
            therapy), and psychiatry services (collectively the “Services”)
            using the Products or via other delivery methods, as applicable.
            Throughout this Privacy Policy, we will collectively refer to all of
            our Products and Services as our “Platform.” This Privacy Policy
            covers the “personal information,” meaning information about an
            identified or identifiable individual that is collected through our
            Product or Services.
            <br />
            <br />
            Depending on how you interact with us, the following may also apply
            to you:
            <br />
            <br />
            <div className="pl-12">
              Our Services are delivered by our Care Providers. For those Care
              Providers in the US, they are classified as covered entities under
              the Health Insurance Portability and Accountability Act (HIPAA).
              Inspire Mental Fitness PLLC is subject to HIPAA as our Care
              Providers’ business associate. Our Care Providers may provide you
              an additional privacy notice during enrollment which we encourage
              you to review. Some components or features of our Platform may
              include additional privacy notices, such as an optional feature
              that uses your personal information in a unique way. Similarly,
              you may have been given access to our Product or Services in a
              manner that includes additional terms or privacy notices such as
              from your employer. The language of those terms and privacy
              notices supplement this Privacy Policy unless there is a conflict,
              in which case those additional terms and privacy notices will
              apply. You may follow links contained in our Platform or provided
              to you by other users to third-party websites or products not
              operated by us. This Privacy Policy does not apply to third-party
              websites or products. We strongly suggest you review their privacy
              policies to understand how your personal information is used and
              stored by those third parties. <br />
              Similar to the above point, you may use single sign-on (SSO)
              features to access our Platform, such as through your social media
              accounts or through your employer. That use may be subject to your
              SSO provider’s terms and privacy policies, and we encourage you to
              review them prior to using those features. This privacy policy
              does not apply to Inspire Mental Fitness PLLC employees or
              applicants to Inspire Mental Fitness PLLC . Applicants can learn
              about how we use their personal information by reading our
              Applicant Privacy Notice here, and employees will be provided
              further details as part of onboarding.
            </div>
            <div>
              <h2>
                Please read the following carefully to understand our practices
                regarding your personal information. We also encourage you to
                review our end-user terms and conditions here.
              </h2>
              <h1 className="py-4 ff-gotham-bold">Table of Contents</h1>
              <p>
                This Privacy Policy is provided in a layered format. We provided
                summaries for each section, but we encourage you to read each
                section in detail
              </p>
              <div class="table-responsive bg-transparent">
                <table class="table table-bordered">
                  <thead class="thead-light">
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Section</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        class="font-weight-bold"
                        onClick={() => scrollToSection("Personal")}
                      >
                        1
                      </td>
                      <td
                        class="font-weight-bold"
                        onClick={() => scrollToSection("Personal")}
                      >
                        Collection of Personal Information
                      </td>
                      <td>
                        We may collect your personal information through our
                        Platform or when you share it with us. Collection may
                        require your input or may be automatically gathered
                        while you engage with us.
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="font-weight-bold"
                        onClick={() => scrollToSection(" Use")}
                      >
                        2
                      </td>
                      <td
                        class="font-weight-bold"
                        onClick={() => scrollToSection(" Use")}
                      >
                        Use of Personal Information
                      </td>
                      <td>
                        Primarily used to operate our Products and Websites, and
                        deliver Services. May also be used for communication,
                        processing payments, complying with legal obligations,
                        and developing new features or improvements.
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="font-weight-bold"
                        onClick={() => scrollToSection("Sharing")}
                      >
                        3
                      </td>
                      <td
                        class="font-weight-bold"
                        onClick={() => scrollToSection("Sharing")}
                      >
                        Sharing of Personal Information
                      </td>
                      <td>
                        May share with third-party service providers to help
                        make our Platform function. May also share as directed
                        by you, to provide opportunities that may interest you,
                        or as legally required, such as to comply with a court
                        order.
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="font-weight-bold"
                        onClick={() => scrollToSection("DataSecurity")}
                      >
                        4
                      </td>
                      <td
                        class="font-weight-bold"
                        onClick={() => scrollToSection("DataSecurity")}
                      >
                        Data Security and Retention
                      </td>
                      <td>
                        The security of your personal information is of utmost
                        importance to us. We retain your personal information
                        for as long as necessary, and we maintain appropriate
                        safeguards to protect it.
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="font-weight-bold"
                        onClick={() => scrollToSection("PrivacyRights")}
                      >
                        5
                      </td>
                      <td
                        class="font-weight-bold"
                        onClick={() => scrollToSection("PrivacyRights")}
                      >
                        Your Privacy Rights
                      </td>
                      <td>
                        We want you to have choice in how your personal
                        information is used. We provide you rights to request
                        actions regarding your personal information including
                        deletion, no matter where you reside.
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="font-weight-bold"
                        onClick={() => scrollToSection("Children")}
                      >
                        6
                      </td>
                      <td
                        class="font-weight-bold"
                        onClick={() => scrollToSection("Children")}
                      >
                        Children's Privacy
                      </td>
                      <td>
                        Our Platform is generally intended for adults, except in
                        limited circumstances depending on your offering.
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="font-weight-bold"
                        onClick={() => scrollToSection("Cookies")}
                      >
                        7
                      </td>
                      <td
                        class="font-weight-bold"
                        onClick={() => scrollToSection("Cookies")}
                      >
                        Cookies
                      </td>
                      <td>
                        When you visit our Websites, we may collect certain
                        information from you automatically through cookies and
                        other tracking technologies. You can decide what cookies
                        are deployed using the cookies settings on our Websites.
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="font-weight-bold"
                        onClick={() => scrollToSection("Changes")}
                      >
                        8
                      </td>
                      <td
                        class="font-weight-bold"
                        onClick={() => scrollToSection("Changes")}
                      >
                        Changes
                      </td>
                      <td>
                        We may change this Privacy Policy to reflect new
                        services, changes in our data practices, or to comply
                        with relevant laws.
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="font-weight-bold"
                        onClick={() => scrollToSection("Contact")}
                      >
                        9
                      </td>
                      <td
                        class="font-weight-bold"
                        onClick={() => scrollToSection("Contact")}
                      >
                        Contact Us
                      </td>
                      <td>
                        You may contact us for comments, questions, or to
                        exercise your privacy rights in various ways including
                        emailing helpdesk@inspirementalfitness.com.
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="font-weight-bold"
                        onClick={() => scrollToSection("Supplemental")}
                      >
                        10
                      </td>
                      <td
                        class="font-weight-bold"
                        onClick={() => scrollToSection("Supplemental")}
                      >
                        Supplemental Notices
                      </td>
                      <td>
                        This section provides additional information specific to
                        certain jurisdictions. Please note, our Platform is
                        operated in the United States where your personal
                        information will be primarily processed and stored.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h1 className="py-4 ff-gotham-bold" id="Personal">
                  1. Collection of personal information
                </h1>
                <div>
                  We may collect or process the following personal information
                  about you from what you provide us directly, we receive from
                  others, and personal information we may automatically collect
                  when you interact with our Platform. <br />
                  (a) Information you provide to us <br />
                  <br />
                  <p className="ps-12">
                    {" "}
                    Contact information and identifiers. When you use our
                    Platform, we may ask you to provide certain contact
                    information, including your first and last name and email
                    address. We may also collect your social media
                    identification number if you choose to access the Products
                    via a social media account. Account Information. If you
                    decide to set up an account with us, we may ask you to
                    provide certain additional contact information including,
                    for example, your first and last name, e-mail address
                    (personal and/or work), telephone number, mailing address,
                    employer or company name, job title, student identification
                    number, emergency contact information, as well as password
                    and other authentication-related information. For
                    individuals who participate in special subscriptions and
                    features, including group plans, we may collect additional
                    personal information, for example, home address and names
                    and emails of household members for example, the names and
                    emails of household members. Health information. We will
                    collect the information you provide about your health and
                    wellness as you use our Products or engage with the
                    Services. You may provide this information through the
                    Products, such as through survey responses about your
                    current mental or physical health status, setting your
                    health or wellness goals, or in other inputs that relate to
                    your health or wellbeing. You may also provide this type of
                    information through the Services, such as talking with your
                    coach or therapist about your current health needs or during
                    treatment. We understand that this information is very
                    sensitive so we handle it with care, including treating this
                    health information as protected health information under
                    HIPAA where applicable. Profile and demographic information.
                    Through your account in our Product, you may have the
                    opportunity to provide additional information about
                    yourself, such as your age, race and ethnicity, sexual
                    orientation, preferred pronouns, gender or gender identity,
                    sex at birth, marital status, and details about your health
                    and medical history. <br />
                    Payment information. If you sign up for a paid product or
                    service from us, you may be required to provide your payment
                    card or bank account information. Please note that Inspire
                    Mental fitness PLLC does not directly process payment card
                    information, and instead relies upon third party payment
                    processors to do so on our behalf. Please note that third
                    party terms may apply to these payment services. Personal
                    information collected for these purposes includes card
                    number, type, expiration date, and billing address, and
                    certain anonymized, limited and/or truncated versions of
                    this information may be provided to Inspire Mental Fitness
                    PLLC. Survey information. We may present you with surveys
                    for Product functionality, to provide you the Services, to
                    provide you with information about our Products and Services
                    that we think may be of interest to you, or for research
                    purposes. These surveys may give you the opportunity to
                    describe certain things about you, your use of the Platform,
                    or feedback on future improvements. Communication
                    information. When you send or respond to emails, messages,
                    chats, or other communications from Inspire Mental Fitness
                    PLLC, we may collect your email address, name, and any other
                    personal information you choose to include in the body
                    content of your communications. In addition, when you
                    interact with certain features of our Products, we may
                    collect the content of those communications. <br />
                    Support information. When you submit a support request or
                    otherwise engage with our support team, we collect the
                    information you provide as part of that interaction. We also
                    utilize live chat and/or chatbot technology, which allow you
                    to communicate directly with our automated customer service
                    system and/or customer service representatives via a chat
                    window about our Products and Services. Text entered into
                    this form prior to submission may be collected, retained,
                    and used by Inspire Mental Fitness PLLC for our business
                    purposes, including by our customer service and other
                    personnel and service providers.
                  </p>
                  <div className="py-4">
                    (b) Information from others <br /> <br />
                    <span>
                      In certain circumstances, we may collect personal
                      information about you from others. This may include the
                      following: <br /> <br />
                    </span>
                    <p className="ps-12">
                      If you receive access to Inspire Mental Fitness PLLC
                      through your employer, health plan, or another party that
                      sponsors your access (your “Benefit Sponsor”), we collect
                      your name and email address and other information that
                      your Benefit Sponsor submits to us to facilitate your
                      enrollment in our Products and Services. We may collect
                      the name, email address, content engagement, and
                      preferences of individuals that our users identify through
                      our sharing and referral features. We use this data for
                      the sole purpose of sharing content and referring
                      individuals to join the Products. We may collect personal
                      information from parents or guardians for operating
                      accounts for their dependants aged 13-17 where supported.
                      If you choose to have your account verified to confirm
                      your eligibility for a select subscription offering, we
                      may allow a third party platform to access the specific
                      personal information you provide in order to perform the
                      verification. Any failure to provide sufficient
                      information or any response Inspire Mental Fitness PLLC
                      considers abnormal may result in Inspire Mental Fitness
                      PLLC refusing (or being unable) to verify your
                      eligibility.
                    </p>
                    <p className="pt-4">
                      (c) Information we automatically collect <br />
                      <br />
                    </p>
                    <p>
                      Our Products and Websites may collect information from you
                      automatically during your use which may include: <br />
                      <br />
                    </p>
                    <p className="ps-12">
                      {" "}
                      Browser and device data, such as IP address, device
                      identifier, device type, operating system and Internet
                      browser type, screen resolution, operating system name and
                      version, device manufacturer and model, language,
                      plug-ins, add-ons, and the language version of the
                      Websites and Products you are visiting. Usage data, such
                      as time spent on the Products and Websites including pages
                      visited, links clicked, approximate location, language
                      preferences, performance of features, patterns of use, and
                      the pages that led or referred you to our Products and
                      Websites. <br />
                      <br />
                      (d) Aggregated, anonymous, and de-identified data We may
                      create or collect aggregated, anonymous, or de-identified
                      data from personal information by removing, masking, or
                      otherwise altering data components that make the data
                      personally identifiable, or potentially personally
                      identifiable to you (“De-Identified Data”). De-Identified
                      Data is not personal information and not subject to this
                      Privacy Policy
                    </p>
                    <h1 className="py-4 ff-gotham-bold" id=" Use">
                      2. Use of personal information
                    </h1>
                    <p>
                      We may use your personal information in the following
                      ways: <br />
                    </p>
                    <p>
                      {" "}
                      To provide our Platform, including the delivery of content
                      and interactive features; To communicate with you
                      regarding our Platform including updates or changes; To
                      provide you support, answer your questions or requests for
                      information, or handle your complaints; To process
                      payment, manage your orders, and account for applicable
                      sales taxes; <br />
                      To inform your Benefit Sponsor, if you have one, about
                      your registration and other information as described in
                      Section 3 below; To fulfill our obligations under any
                      agreements that we may have with you; To maintain and
                      improve the quality of our Platform, including to perform
                      research and development, understand user trends, and, in
                      a limited way, understand the effectiveness of our
                      marketing and advertising such as recording a sales
                      conversion;
                      <br />
                      To provide you with information about new Products and
                      Services, promotions, and other opportunities that we
                      believe may be of interest to you, whether offered by us
                      or third-party partners, and to personalize, measure, and
                      improve such offers; <br />
                      To personalize the advertisements you receive about our
                      Platform through third-party platforms, on other websites
                      and apps; <br />
                      To protect ourselves, you and others such as by taking
                      actions to prevent fraud and other unlawful or
                      unauthorized activity, and creating and maintaining a
                      trusted, secure, and reliable online environment; and To
                      comply with our legal obligations including meeting
                      regulatory compliance obligations, responding to
                      subpoenas, court orders or other legal processes; and{" "}
                      <br />
                      to establish or exercise our legal rights or defense
                      against legal claims.
                    </p>
                    <h1 className="py-4 ff-gotham-bold" id="Sharing">
                      3. Sharing of personal information
                    </h1>
                    <p className="pt-4">
                      We may disclose your personal information with the
                      following categories of third parties: <br /> <br />
                    </p>
                    <p className="ps-12">
                      {" "}
                      Our service providers. In some circumstances we may need
                      to disclose your personal information to a third party so
                      that they can provide a service on our behalf, such as to
                      help deliver Products or Services that you have requested.
                      These service providers may include services such as
                      analytics, payment processing, advertising and marketing,
                      website hosting, customer and technical support, and other
                      services. Our service providers have access to your
                      personal information only to perform these tasks on our
                      behalf, based on our instructions and are contractually
                      obligated to maintain the confidentiality and security of
                      your personal information, and to not disclose or use your
                      personal information for any other purpose inconsistent
                      with this Privacy Policy and applicable law. Your
                      integrations. You may connect your account through
                      supported integrations with third parties and we will
                      share your personal information with those third parties.
                      If you do connect an integration, that third party’s terms
                      and privacy policy may apply to the personal information
                      shared as a result and we encourage you to review those
                      before setting up the integration. For example, if you are
                      on iOS, you may connect our Products to Apple’s Health
                      Kit. If you do, iOS Privacy Policy and Terms of Use apply,
                      and can be reviewed at www.apple.com/legal/privacy.
                      Community Activity. If you engage with other Platform
                      users using our community features, we will share some
                      information about you such as your name associated with
                      your comment on a forum or other information you choose to
                      share with other users. Your Benefit Sponsor. In limited
                      cases, we may provide certain personal information to your
                      Benefit Sponsor, including your name, email address, your
                      registration date, and the date on which you last used our
                      Platform. Generally, we restrict this sharing to not
                      include specific details of your in-app activity or any
                      details about your use of Services, like therapy. This
                      restriction may not apply where sharing some of your
                      activity is necessary for your treatment, payment, or
                      healthcare operations such as if your Benefit Sponsor is
                      your other healthcare provider, health insurance provider,
                      or health plan. Third party business partners. In limited
                      cases, we may provide certain personal information to
                      third party businesses with which we have a joint
                      promotional relationship, bundled subscription offer, or
                      other trusted partnership. This type of sharing will most
                      often be consistent with your notice, consent, direction,
                      and/or reasonable expectations in light of the
                      circumstances in which you provided the personal
                      information. Third party advertising platforms. We work
                      with third party platforms who provide us with analytics
                      and advertising services. This includes helping us
                      understand how users interact with our Platform serving
                      advertisements on our behalf to those who may be
                      interested, and measuring the performance of those
                      advertisements. Compliance and harm prevention. If we are
                      under a duty to disclose or share your personal
                      information in order to comply with any legal obligation,
                      such as to comply with a subpoena, bankruptcy proceeding,
                      similar legal process, or in order to enforce our
                      agreements with you; or to protect the rights, property,
                      or safety of Inspire Mental Fitness PLLC, our customers,
                      or others. This includes exchanging information with other
                      companies and organizations for the purposes of fraud
                      protection and credit risk reduction. We may also disclose
                      personal information where we believe that doing so would
                      be in accordance with or required by any applicable law,
                      regulation or legal process. Affiliates and business
                      transfer. We may share your personal information with any
                      member of our business group.If such transfer results in a
                      material change to the use of your personal information,
                      we will provide notice before your personal information is
                      transferred or becomes subject to a different privacy
                      policy.
                    </p>
                    <h1 className="py-4 ff-gotham-bold" id="DataSecurity">
                      4. Data security and retention
                    </h1>
                    <p>
                      The security of your personal information is important to
                      us. We follow generally accepted standards, practices, and
                      procedures to protect the personal information submitted
                      to us, both during transmission and once it is received.
                      We maintain appropriate technical, administrative and
                      physical safeguards to help protect the security of your
                      personal information against unauthorized access,
                      destruction, loss, alteration, disclosure or misuse.{" "}
                      <br />
                      <br />
                      No security can be fully guaranteed, though. If you have
                      an account with us and you suspect unauthorized use of
                      your account or its credentials, you should contact us
                      immediately using the contact information provided
                      herewith in this policy. <br />
                      <br />
                      We will keep your personal information for as long as
                      needed to perform our obligations to you, or for as long
                      as legally permitted. The criteria used to determine our
                      retention periods include: (i) the length of time we have
                      an ongoing relationship with you; (ii) whether there is a
                      legal obligation to which we are subject; and (iii)
                      whether retention is advisable in light of our legal
                      position (such as in regard to applicable statutes of
                      limitations, litigation or regulatory investigations). For
                      example, we keep your account information, like your name,
                      email address, and password, for as long as your account
                      exists so that you may access it.
                    </p>
                    <h1 className="py-4 ff-gotham-bold" id="PrivacyRights">
                      5. Your privacy rights
                    </h1>
                    <p>
                      We believe that you should have control of your personal
                      information. To that end we provide the following rights
                      to make requests regarding your personal information. You
                      may make these requests by contacting
                      helpdesk@inspirementalfitness.com or in some cases using
                      features within the Platform: <br />
                      <br /> Access. You have the right to know what personal
                      information we collect about you and how we use it. This
                      Privacy Policy serves to inform you about that collection
                      and use. If we have personal information about you, you
                      may also request a copy of that information. Correction.
                      You have the right to request the correction of your
                      inaccurate personal information. Portability. You may
                      request an export of your personal information in a
                      structured and machine readable format such as a .csv or
                      .pdf. Where feasible, we can send that export to a third
                      party you identify. Deletion. You have the right to
                      request, under certain circumstances, the deletion of your
                      personal information that we collect. Restriction. You
                      have the right to request that Inspire Mental Fitness PLLC
                      restrict the use of your personal information in certain
                      circumstances. Please note that in some cases we may not
                      be able to place a restriction due to the use being
                      necessary for Product functionality or delivery of the
                      Services. No retaliation or discrimination. You have the
                      right not to receive discriminatory or retaliatory
                      treatment for making a request. <br />
                      <br />
                      Upon receiving your request, we may ask for additional
                      information from you in order to verify the request or
                      confirm how you would like to proceed. We endeavor to
                      respond to a verifiable request without undue delay. If we
                      require an extended amount of time, we will inform you
                      using the email associated with your account or the email
                      you used to make the request. <br />
                      <br />
                      We do not charge a fee to process your verifiable request
                      unless it is excessive, repetitive, or clearly unfounded.
                      If we determine that your request requires a fee, we will
                      tell you why and provide you with a cost estimate before
                      completing your request.
                      <br />
                      <br />
                      We do not charge a fee to process your verifiable request
                      unless it is excessive, repetitive, or clearly unfounded.
                      If we determine that your request requires a fee, we will
                      tell you why and provide you with a cost estimate before
                      completing your request.
                    </p>
                    <h1 className="py-4 ff-gotham-bold" id=" Children">
                      6. Children’s privacy
                    </h1>
                    <p>
                      At Inspire Mental Fitness PLLC , we are committed to
                      protecting and respecting children’s privacy. We do not
                      intentionally collect personal information from
                      individuals under 18 years old without parental permission
                      or involvement. There are limited exceptions: <br />
                    </p>
                    <p className="ps-12">
                      {" "}
                      If you are in the US and participate in our Inspire Mental
                      Fitness PLLC through certain Benefit Sponsors’ offerings,
                      you may register an account as long as you are at least 13
                      years old. If you are a US user 13 to 17 years old who may
                      have joined as noted above, you may enroll in the Services
                      with verifiable parent or guardian consent. If you are a
                      parent under our employee assistance program (EAP), you
                      may refer your child of at least 6 years old to our Care
                      Providers for in-person care but cannot create an account
                      for them.
                    </p>
                    <p>
                      You also may notice some content in our Products that
                      appears geared towards children. This content is only
                      meant for you to share with your child under your
                      supervision, and does not require or allow your child to
                      create an account. <br />
                      <br />
                      If you are a parent or guardian and you are aware that a
                      child under age 13 has provided us with their personal
                      information without parental consent, please contact us at
                      helpdesk@inspirementalfitness.com and we will take steps
                      to remove that personal information from our servers.
                    </p>
                    <h1 className="py-4 ff-gotham-bold" id="Cookies">
                      7. Cookies
                    </h1>
                    <p>
                      When you visit our Websites, we may collect information
                      from you automatically through cookies including cookies
                      provided by third parties. We use cookies and the
                      information they collect for a variety of purposes
                      including functionality, analyzing performance, security,
                      personalizing Website content, and advertising. We will
                      get your consent in order to use such trackers or provide
                      you with the opportunity to opt-out of cookies, to the
                      extent required by applicable law. You may use an opt-out
                      preference signal, such as the Global Privacy Control
                      (GPC), to opt-out of the sale/sharing of your personal
                      information. For more information on the types of cookies
                      we use and your choices regarding them,{" "}
                      <span className="text-blue-700 border-b-2 border-b-blue-700">
                        {" "}
                        please review our Cookie Policy.
                      </span>
                    </p>
                    <h1 className="py-4 ff-gotham-bold" id="Changes">
                      8. Changes
                    </h1>
                    <p>
                      This Privacy Policy is effective as of the date posted at
                      the top. We may update this Privacy Policy from time to
                      time to reflect Platform changes, make corrections,
                      improve clarity, reflect changes in our privacy practices,
                      or as required by applicable laws. When we may make a
                      significant change, such as on how we use your personal
                      information or your rights, we will notify you within the
                      Platform or through another channel such as the email you
                      supplied during account registration, in addition to
                      posting the revised version on our Website. We encourage
                      you to periodically check this Privacy Policy to stay
                      informed about how we handle your personal information.
                    </p>
                    <h1 className="py-4 ff-gotham-bold" id="Contact">
                      9. Contact us
                    </h1>
                    <p>
                      We want to hear from you if you have questions, concerns,
                      or requests regarding this Privacy Policy. You can reach
                      us by emailing helpdesk@inspirementalfitness.com{" "}
                    </p>
                    <h1 className="py-4 ff-gotham-bold" id="Supplemental">
                      10. Supplemental notices
                    </h1>
                    <p>
                      Depending on your jurisdiction, you have additional rights
                      that apply to you under your jurisdiction's privacy laws.
                      We provide the supplemental information in this section in
                      our efforts to comply with those additional privacy laws
                      and inform you about your rights. If you do not see your
                      jurisdiction below please do not interpret that to mean
                      that we do not respect your privacy and we encourage you
                      to still contact us using the contact details above with
                      your questions or concerns. Please note that Inspire
                      Mental Fitness PLLC is a US based company and your
                      personal information will be stored within the US. <br />
                      <br />
                      Legal basis. Inspire Mental Fitness PLLC relies on one or
                      more legal basis to process your personal information
                      under applicable law, including:
                    </p>
                    <br />
                    <p>
                      {" "}
                      (i) with your consent, which you may withdraw at any time;{" "}
                      <br />
                      (ii) when the processing is necessary to perform our
                      contractual obligations to you, like under our Terms;{" "}
                      <br />
                      (iii) when necessary to pursue our legitimate interests as
                      further detailed below; <br />
                      (iv) when necessary for our compliance with our legal
                      obligations such as a request or order from courts, law
                      enforcement or other government authorities. <br /> <br />
                      Legitimate business interests. We may collect, process,
                      and maintain personal information to pursue the legitimate
                      business interests outlined below. To determine these
                      legitimate interests, we balance our legitimate interests
                      against the legitimate interests and rights of you and
                      others, and only process personal information in
                      accordance with those interests where they are not
                      overridden by your data-protection interests or
                      fundamental rights and freedoms.
                    </p>
                    <br />
                    <h2>Our legitimate interests generally include:</h2>
                    <p>
                      {" "}
                      Providing you with our Platform, including functionality
                      of features or Websites you interact with or so that we
                      can provide you the Services. Providing you with customer
                      service and support, including to send you messages and
                      provide user support, and to facilitate other
                      communications that you request or are required to render
                      our Products and Services to you. This may include
                      providing you with information about new products and
                      other opportunities we offer that we believe may be of
                      interest to you based upon your interactions with us, and
                      to personalize, measure, and improve such offers.
                      Maintaining and improving the quality of the Products and
                      Services that we offer, including to customize our
                      features to better fit your needs as a user, develop new
                      sites and products, to perform internal analytics for new
                      and existing products (such as our user accounts and
                      related features) and to conduct research and development.
                      This also includes sharing personal information with our
                      trusted service providers that provide services on our
                      behalf. <br />
                      Protecting you and others, as well as, to create and
                      maintain a trusted environment, such as to ensure
                      compliance our agreements with you and other third
                      parties, to ensure safe, secure, and reliable sites and
                      products, and to detect and prevent wrongdoing and crime,
                      assure compliance with our policies, and protect and
                      defend our rights, interests, and{" "}
                      <property className="br"></property>
                      To provide, personalize, measure and improve our
                      marketing, including to send you promotional messages and
                      other information that may be of interest to you with your
                      consent. We may also use personal information to
                      understand our user base and the effectiveness of our
                      marketing. This processing is done pursuant to our
                      legitimate interest in undertaking marketing activities to
                      offer products or services that may be of interest to you.
                      For risk management purposes, including compliance with
                      our legal and regulatory obligations and for fraud
                      detection, prevention and investigation, including “know
                      your customer,” anti-money laundering, conflict and other
                      necessary onboarding and ongoing client checks, due
                      diligence and verification requirements, credit checks,
                      credit risk analysis, compliance with sanctions procedures
                      or rules, and tax reporting. <br />
                      Complying with laws and regulations applicable to us,
                      including any legal or regulatory guidance, codes, or
                      opinions and to other legal process and law enforcement
                      requirements, including any internal policy based on or
                      reflecting legal or regulatory guidance, codes, or
                      opinions. We may also respond to subpoenas, court orders,
                      or legal process, and establish and exercise our legal
                      rights or defenses against legal claims.
                      <br />
                      <br />
                      Inspire Mental Fitness PLLC is not a data broker and does
                      not sell your personal information to third parties for
                      payment. However, as with many online companies, Inspire
                      Mental Fitness PLLC partners with third parties to manage
                      our advertising on other platforms. <br /> <br />
                      Use of personal information. We may use your personal
                      information in the following ways:
                      <p>
                        {" "}
                        To provide our Platform, including the delivery of
                        content and interactive features; <br />
                        To communicate with you regarding our Platform including
                        updates or changes; <br />
                        To provide you support, answer your questions or
                        requests for information, or handle your complaints;{" "}
                        <br />
                        To process payment, manage your orders, and account for
                        applicable sales taxes; <br />
                        To inform your Benefit Sponsor, if you have one, about
                        your registration and other information as described in
                        Section 3 below; <br />
                        To fulfill our obligations under any agreements that we
                        may have with you; To maintain and improve the quality
                        of our Platform, including to perform research and
                        development, understand user trends; <br />
                        To provide you with information about new Products and
                        Services, promotions, and other opportunities that we
                        believe may be of interest to you, whether offered by us
                        or third-party partners, and to personalize, measure,
                        and improve such offers; <br />
                        To personalize the advertisements you receive about our
                        Platform through third-party platforms, on other
                        websites and apps; <br />
                        To protect ourselves, you and others such as by taking
                        actions to prevent fraud and other unlawful or
                        unauthorized activity, and creating and maintaining a
                        trusted, secure, and reliable online environment; and To
                        comply with our legal obligations including meeting
                        regulatory compliance obligations, responding to
                        subpoenas, court orders or other legal processes; and{" "}
                        <br />
                        To establish or exercise our legal rights or defense
                        against legal claims.
                      </p>
                      <p className="py-4">
                        Use of sensitive personal information. We use sensitive
                        personal information for the same purposes listed above
                        except for personalizing ads. <br />
                        <br />
                        Retention. We will keep your personal information for as
                        long as needed to perform our obligations to you, or for
                        as long as legally permitted. The criteria used to
                        determine our retention periods include: (i) the length
                        of time we have an ongoing relationship with you; (ii)
                        whether there is a legal obligation to which we are
                        subject; and (iii) whether retention is advisable in
                        light of our legal position (such as in regard to
                        applicable statutes of limitations, litigation or
                        regulatory investigations). For example, we keep your
                        account information, like your name, email address, and
                        password, for as long as your account exists so that you
                        may access it. <br />
                        <br /> Right to know and access. You have the right to
                        know what personal information we collect, use,
                        disclose, and sell and/or share, as those terms are
                        defined under applicable law. You may ask us to provide
                        you a portable copy of this information up to two times
                        in a rolling twelve-month period. Right to delete. You
                        have the right to request under certain circumstances
                        that we, as well as our service providers and
                        contractors, delete the personal information that we
                        collect about you. Right to correct inaccurate personal
                        information. You have the right to request the
                        correction of inaccurate personal information. Right to
                        non-discrimination. You have the right not to receive
                        discriminatory treatment for the exercise of the privacy
                        rights described above. Right to opt out of sale and/or
                        sharing. You have the right to opt-out of the sale
                        and/or sharing of your personal information by a
                        business. Please see our Notice of Right to Opt-Out
                        below for more information. Right to limit use and
                        disclosure. You have the right to limit the use or
                        disclosure of your sensitive personal information to
                        only the uses necessary for us to provide goods or
                        services to you. We will not use or disclose your
                        sensitive personal information after you have exercised
                        your right unless you subsequently provide consent for
                        the use of your sensitive personal information for
                        additional purposes. Sharing with third parties for
                        their own direct marketing purposes. Inspire Mental
                        Fitness PLLC does not disclose personal information to
                        third parties for their own direct marketing purposes.
                        HNotice of right to Opt-Out.
                        <br /> <br />
                        Collection of personal information. Inspire Mental
                        Fitness PLLC may collect the personal information
                        described in Section 1 and as categorized in the table
                        within Section 10(b) above. Please note that some of
                        this personal information will be considered sensitive
                        under your state’s legal definition which can vary
                        across different states. The personal information we may
                        collect depending on how you use our Platform includes
                        mental or physical health information, racial or ethnic
                        origin, and information about sexual orientation or
                        gender identity. <br />
                        <br />
                        Use of personal information. Inspire Mental Fitness PLLC
                        may collect, use, or disclose personal information about
                        US state residents for purposes listed in Section 2 of
                        our Privacy Policy. We use sensitive personal
                        information for the same purposes except for
                        personalizing ads. <br />
                        <br />
                        Disclosure of personal information. We may disclose your
                        personal information to the categories of service
                        providers and third parties identified in Section 3 of
                        this Privacy Policy, and in ways that are described in
                        that section. <br />
                        <br />
                        Your privacy rights. We generally provide the privacy
                        rights described in Section 5 above to you regardless of
                        your location. Your state may afford you additional
                        privacy rights as noted below. To exercise your right,
                        see the contact information in Section 9 or follow the
                        instructions below for specific state rights. We will
                        respond to your verifiable request within the time limit
                        afforded under applicable law. Exceptions may still
                        apply as described in Section 5.
                      </p>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacyplans;
