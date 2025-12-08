import React, { useRef, useEffect } from "react";

const TermsConditions = () => {
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
    <div className="container py-5">
      <div>
        <h1 className="text-[35px] font-medium  ff-gotham-medium">
          Inspire Mental Fitness PLLC Terms & Conditions
        </h1>
        <p className="py-2">
          When you subscribe with Inspire Mental Fitness , we understand that
          you are choosing our services for a serious manner trusting us to take
          care of your mental health concerns and performance. We take that
          responsibility seriously. It therefore matters how you access our
          services and how we handle your information. We’d like to take this
          opportunity to explain what we are setting out to deliver as a company
          and what you can reasonably expect from us. Please take a few moments
          to read our terms and conditions.
        </p>
        <h3 className="ff-gotham-normal text-[20px]">Table of Contents</h3>
        <ul className="flex py-2 ff-gotham-normal border-2 border-r-0 border-l-0 border-t-0 border-b-black flex-col gap-2 ps-6 list-disc">
          <li>1. WHAT YOU’RE SIGNING UP FOR</li>
          <li> 2. JOINING THE Inspire Mental Fitness PLLC COMMUNITY</li>
          <li> 3. CANCELING MEMBERSHIP</li>
          <li> 4. PROHIBITED USE OF THE PRODUCTS AND SERVICES</li>
          <li> 5. MATTERS OF OWNERSHIP</li>
          <li> 6. AVAILABILITY OF PRODUCTS AND SERVICES</li>
          <li> 7. USER MATERIAL</li>
          <li> 8. THIRD PARTY TERMS AND LINKS</li>
          <li> 9. ASSUMPTION OF RISK</li>
          <li> 10. WARRANTIES AND DISCLAIMERS</li>
          <li> 11. DIGITAL MILLENNIUM COPYRIGHT ACT (“DMCA”) NOTICE</li>
          <li> 13. INTERNATIONAL USE</li>
          <li> 14. DISPUTE RESOLUTION & BINDING ARBITRATION</li>
          <li>15. GENERAL</li>
        </ul>
        <h4 className="ff-gotham-normal pt-4">Effective: November 15, 2024.</h4>
        <p className="py-4  ff-gotham-normal ">
          If you are visually impaired, have another disability or seek support
          in other languages, you may access these Terms by emailing us at
          helpdesk@inspirementalfitness.com.
          <br />
          <br />
          Inspire Mental Fitness, PLLC and its subsidiaries and affiliates
          (“Inspire Mental Fitness PLLC,” “us” or “we”) provides content and
          products via: www.inspirementalfitness.com (the “Website”), our
          applications (the “Apps”), or other delivery methods (the Website, the
          Apps and such content and products are collectively the “Product”).
          Inspire Mental Fitness PLLC, in partnership with its affiliated mental
          health providers and partners, may deliver coaching services,
          psychotherapy services (i.e. therapy),(collectively the “Services”)
          using the Products or via other delivery methods, as applicable. For
          purposes of clarity, the Services are provided by coaches and licensed
          clinicians employed by or contracted with Inspire Mental Fitness PLLC.
          Inspire Mental Fitness PLLC offers a technology platform through which
          the Providers provide virtual telehealth services.
          <br />
          <br />
          These Terms & Conditions (these “Terms”) govern your access to and use
          of the Products and Services. The term “Device” refers to the device
          which is used to access the Products or Services, including but not
          limited to computers, smartphones, and tablets. The term “you” refers
          to the user of the Products or Services.
        </p>

        <p className="py-4 ff-gotham-normal ">
          Protecting and safeguarding any personal information you provide
          through the Products and Services is extremely important to us.
          Information about our privacy practices can be found in our Privacy
          Policy (“Privacy Policy”). You acknowledge that your use of the
          Products and Services is also subject to our Privacy Policy. You
          further acknowledge that your use of the Products and Services may
          require the collection of your health information. This health
          information may be considered sensitive under your local laws. For
          example, this health information can fall under the “special category”
          of personal data under the GDPR which you can learn more about in
          Section 10 of our Privacy Policy. In certain US states, this health
          information may be “consumer health data” as defined under applicable
          laws including Washington’s My Health My Data Act, Connecticut’s Data
          Privacy Act, and Nevada’s SB 370. If you are from those states, you
          can learn more in our Consumer Health Data Privacy Policy which
          supplements the Inspire Mental Fitness PLLC Privacy Policy and applies
          to personal information that falls within the definition of “consumer
          health data.” We encourage you to review both policies to learn more
          about our privacy practices and our commitments to you. <br />
          <br />
          YOU AGREE THAT THE PRODUCTS AND SERVICES ARE NOT INTENDED TO BE USED
          IN A MEDICAL EMERGENCY. IF YOU ARE LOCATED IN THE UNITED STATES AND
          YOU ARE HAVING THOUGHTS OF SUICIDE OR SELF-HARM, PLEASE CALL OR TEXT
          988, THE SUICIDE AND CRISIS LIFELINE. IF YOU ARE EXPERIENCING A
          MEDICAL OR MENTAL HEALTH EMERGENCY, PLEASE CONTACT 911 OR GO TO THE
          NEAREST EMERGENCY ROOM. DO NOT ATTEMPT TO ACCESS EMERGENCY CARE
          THROUGH THESE PRODUCTS AND SERVICES. IF YOU ARE LOCATED OUTSIDE OF THE
          UNITED STATES, PLEASE CONTACT YOUR LOCAL CRISIS OR EMERGENCY RESOURCES
          OR GO TO THE NEAREST EMERGENCY ROOM. <br />
          <br />
          PLEASE NOTE THAT THESE TERMS CONTAIN AN ARBITRATION CLAUSE (SECTION
          14). EXCEPT FOR CERTAIN TYPES OF DISPUTES MENTIONED IN THE ARBITRATION
          CLAUSE, YOU AND INSPIRE MENTAL FITNESS PLLC AGREE THAT DISPUTES
          RELATING TO THESE TERMS OR YOUR USE OF THE PRODUCTS AND SERVICES WILL
          BE RESOLVED BY MANDATORY BINDING ARBITRATION, AND YOU WAIVE ANY RIGHT
          TO PARTICIPATE IN A CLASS-ACTION LAWSUIT OR CLASS-WIDE ARBITRATION.
          <br />
        </p>
        <h2 className="fs-4 text-secondary fw-bold">
          1. WHAT YOU’RE SIGNING UP FOR
        </h2>
        <h2 className="fs-4py-4 fw-bold">1.1 PRODUCTS AND SERVICES</h2>
        <p className="pt-2 pb-4">
          Products include, without limitation, meditation and mindfulness
          content for stress, sleep, focus and movement. Services include,
          without limitation, mental health support through coaching, therapy,
          and psychotherapy. If you elect to access and receive the Services,
          your care may be provided by mental health coaches and licensed health
          care providers.
        </p>
        <h2 className="fs-4py-4 fw-bold">
          1.2 GENERAL RULES FOR USE OR ACCESS
        </h2>
        <p>
          (a) When you order (“Order”) any Products or Services, or otherwise
          use or access the Products or Services, you agree to be bound by these
          Terms and all applicable laws, rules, regulations, judicial orders,
          executive orders or similar binding legal instruments (“Applicable
          Law”). You may also be asked to click “I agree” prior to your purchase
          or access to the Products and Services. If you do not click “I agree”,
          you may not be able to complete your purchase or access the Products
          or Services. If you do not agree to these Terms, please do not use the
          Products or Services.
          <br /> <br />
          (b) These Terms and the applicable Order set out the whole agreement
          between you and us for the supply of the Products and Services unless
          expressly stated otherwise. For instance, in order to use or access
          certain Products or Services or other special offerings, you may be
          required to agree to additional terms and conditions or policies;
          those additional terms or policies are hereby incorporated into these
          Terms. Where such terms or policies are inconsistent with these Terms,
          the additional terms or policies will control. <br />
          <br />
          (b) These Terms and the applicable Order set out the whole agreement
          between you and us for the supply of the Products and Services unless
          expressly stated otherwise. For instance, in order to use or access
          certain Products or Services or other special offerings, you may be
          required to agree to additional terms and conditions or policies;
          those additional terms or policies are hereby incorporated into these
          Terms. Where such terms or policies are inconsistent with these Terms,
          the additional terms or policies will control. <br />
          <br />
          (d) Use of the Products and Services is dependent upon your use of a
          computer with adequate software or a supported mobile device and
          Internet access. The maintenance and security of this equipment may
          influence the performance of the Products and Service and it is your
          responsibility to ensure the equipment’s functionality. You are
          responsible for all Internet access charges. Please check with your
          Internet provider for information on possible Internet data usage
          charges.
        </p>
        <h2 className="fs-4py-4 fw-bold">1.3 CHANGES TO TERMS</h2>
        <p>
          Inspire Mental Fitness PLLC reserves the right to change or update
          these Terms, or any other of our policies or practices, at any time.
          If a change to these Terms materially modifies your rights or
          obligations, we may notify you and require that you accept the
          modified Terms in order to continue to use the Products or Services.
          We may notify you of such changes via pop-up or push notifications
          within the Products or via email. If you continue to use the Products
          or Services after modification, you agree to abide by the modified
          Terms.
        </p>
        <h2 className="fs-4py-4  text-secondary fw-bold">
          2. JOINING THE INSPIRE MENTAL FITNESS PLATFORM
        </h2>
        <h2 className="fs-4 fw-bold">2.1 BECOMING A SUBSCRIBER</h2>
        <p className="py-4">
          (a) To access the Products or Services, you must sign up as a
          registered user (a “Subscriber”). You can do this via our Websites,
          our Apps or via certain third-party social networking services. If you
          become a member via a third-party, such third-party terms and policies
          may apply. To become a Subscriber, you need to provide certain
          personal information, including but not limited to, your first name,
          last name, email address, date of birth and a password to be used in
          conjunction with that email address (“User Information”). You are
          responsible for maintaining the confidentiality of your account and
          password and for restricting access to your Device. You may not
          register for more than one Subscriber account. In order to access or
          use certain Products or Services, you may need to provide additional
          User Information. <br />
          <br />
          (b) By registering as a Subscriber and using and/or accessing the
          Products or Services, you warrant that: (i) you are legally capable of
          entering into binding contracts; (ii) all User Information you submit
          is truthful, accurate, and up to date; (iii) you will maintain the
          accuracy of such information; and (iv) your use of the Products and
          Services does not violate these Terms or any Applicable Law. <br />
          <br />
          (c) Subscriptions (as defined below) are not transferable. You agree
          to not sell, transfer, or exchange Subscriptions in any way or under
          any circumstance. This expressly applies to any discounted,
          subsidized, or Free Trials (as defined below) or Subscriptions.
        </p>
        <h2 className="fs-4 fw-bold">2.2 CHILDREN</h2>
        <p className="py-4">
          Our Products and Services are generally intended for individuals under
          18 years of age. There are limited exceptions:
          <br />
          <br />
          (a) If you are in the US and 12-17 years old, you may access our
          Products via parental discretion along with parents user
          identifications Please refer to materials specific to such offerings
          for more information.
          <br />
          <br />
          (b) If you are in the US and 12-17 years old, you may access our
          Services via certain Benefit Sponsor offerings with verifiable parent
          or guardian consent.
          <br />
          <br />
          (c) Subscribers with access to our EAP services (as defined in Section
          8) may refer their child of at least 6 years old to receive access to
          EAP services, including in-person clinical support.
          <br />
          <br />
          (d) If you are in the US and 12-17 years old, you may access our
          Products via our Inspire Mental Fitness for teams offering.
          <br />
          <br />
          We do not support Subscriptions under the age of 12 without parental
          consent or involvement.
        </p>
        <h2 className="fs-4 fw-bold">2.3 SUBSCRIPTIONS & PURCHASES</h2>
        <p className="py-4">
          (a) Free Trials. You may have access to a free trial period of certain
          Products (“Free Trial”). You are only allowed one Free Trial
          regardless of your subscription method. We reserve the right to
          determine eligibility for Free Trials, which may vary based on factors
          including the Product or Service you select and whether you have
          redeemed a Free Trial previously. Free Trials automatically convert to
          a paid annual or monthly subscription term after a certain period of
          time. You can disable the automatic conversion by following the
          cancellation instructions set forth in Section 3 prior to the date of
          conversion. <br />
          <br />
          (b) Automatically Renewing Subscriptions. Members may access the
          Products or Services via a subscription fee-based program
          (“Subscription”). Subscriptions may be available via monthly or annual
          options (“Subscription Term”). For the purposes of our monthly and
          annual subscriptions, a month constitutes 30 calendar days and a year
          constitutes 365 calendar days. Subscriptions may be charged separately
          for Products and Services. If you activate a Subscription, you
          authorize Inspire Mental Fitness PLLC to periodically charge, on a
          going-forward basis all accrued sums (“Subscription Fee”) on or before
          the payment due date for the accrued sums. Your account will be
          charged automatically on the date when you purchase your first
          subscription to the Product or Service (“Subscription Billing Date”)
          for all applicable fees and taxes for the next subscription period.
          The Subscription will continue unless and until you cancel your
          Subscription or Inspire Mental Fitness PLLC terminates your
          Subscription or your account. <br />
          <br />
          (c) Subscription Cancellation. You may cancel your Subscription at any
          time, but you must cancel your Subscription before it renews in order
          to avoid billing of the next periodic Subscription Fee to your
          account. See more about cancellation at Section 3.
          <br />
          <br />
          (d) No Refunds on Subscriptions. Refunds cannot be claimed for any
          partial Subscription Term. Inspire Mental Fitness PLLC will bill the
          periodic Subscription Fee to the payment method you provide to us
          during registration (or to a different payment method if you change
          your payment information) (“Payment Method”). You will only have
          access to the Products and Services while your Subscription is active
          and subsisting.
          <br />
          <br />
          (e) Subscription Methods. You may subscribe via: (i) purchasing a
          subscription to the Products or Services from the Website, within the
          Apps, where allowed by the App marketplace partners, (ii) a Benefit
          Sponsor (as defined in Section 2.5) or (iii) a bundle with one or more
          of our bundle subscription partners. Please note that if you purchase
          a subscription through the Apple Store or our iPhone application, the
          sale is final, and we will not provide a refund. Your purchase will be
          subject to Apple’s applicable payment policy, which also may not
          provide for refunds. If you purchase a subscription through the Google
          Play store, the sale is final and we will not provide a refund. Your
          purchase will be subject to Google’s applicable payment policy, which
          also may not provide for refunds. If your Subscription is through a
          Benefit Sponsor or one or more of our bundle subscription partners,
          additional terms and policies may apply, and your Subscription may be
          paid for, partially paid for, or managed by the Benefit Sponsor or the
          bundle subscription partner. <br />
          <br />
          (f) Gift Subscriptions. “Gift Subscriptions” are pre-paid
          Subscriptions to the Products. A person who purchases the gift is the
          “Giftee.” A person who receives and redeems a Gift Subscription is the
          “Recipient.” Gift Subscriptions are paid for by a one-time upfront
          payment. Once bought, the Giftor will receive an Order confirmation
          and receipt. The Gift Subscription will be sent to the Recipient on
          the Giftor’s specified date with a gifting code to redeem the Gift
          Subscription. Gifting codes can only be used once in the country for
          which they were purchased and cannot be redeemed for cash, resold or
          combined with any other offers, including free trial unless expressly
          stated otherwise. Please note that gifting codes cannot be redeemed if
          the Recipient has already purchased a subscription through the Apple
          iTunes Store,our iPhone application, the Google Play Store, or our
          Android application. We will automatically bill the Payment Method
          that the Giftor provided for any purchased Gift Subscriptions at the
          time of purchase, not upon delivery to or redemption by Recipient.
          There are no refunds or other credits for Gift Subscription that are
          not redeemed. Inspire Mental fitness PLLC will notify the Recipient
          prior to the end of the Gift Subscription that the gift period is
          about to expire. Inspire Mental Fitness PLLC is not responsible if a
          Gift Subscription is lost, stolen or used without permission.
          <br />
          <br />
          (g) Purchases. You may access some Products or Services by paying
          Inspire Mental Fitness PLLC or our App marketplace partners a
          non-recurring fee at the time of subscription (“Purchase”). If you
          make a Purchase, you authorize Inspire Mental Fitness or our App
          marketplace partners, as applicable, to charge all accrued sums
          (“Fees”) on the payment due date for the accrued sums. Your account
          will be charged automatically on the date when you purchase the
          Product. Please note that the sale is final for all Purchases, and we
          will not provide a refund.
          <br />
          <br />
          (h) Discounts. Inspire Mental Fitness PLLC may offer certain special
          discount pricing options (the “Special Discount Pricing Options”).
          Such Special Discount Pricing Options will only be available to
          qualified users (the “Qualified Users”). Inspire Mental Fitness PLLC
          reserves the right to determine if you are a Qualified User in our
          sole discretion. Additional terms may apply to such Special Discount
          Pricing Options.
          <br />
          <br />
          (i) Prices in US Dollars include tax unless otherwise stated. You
          agree not to hold us responsible for banking charges incurred due to
          payments on your account. If payment is not received by us from the
          Payment Method you provided, you agree to pay all amounts due upon
          demand by us.
        </p>
        <h2 className="fs-4 fw-bold"> 2.4 PAYMENT TERMS</h2>
        <p className="py-4">
          (a) Your use of the Products and Services may require you to pay fees.
          We reserve the right to determine pricing for the Products and
          Services. The fees you owe may vary based on many factors, including
          but not limited to your employer, healthcare provider, health plan or
          other Benefit Sponsor’s agreement with us, or the coverage offered by
          your applicable health insurance provider. We are not responsible for
          whether your health insurance offers any amount of coverage for the
          Products and Services. We will make reasonable efforts to keep pricing
          information published on our Website up-to-date.
          <br />
          <br />
          (b) You are responsible for all applicable fees and charges incurred,
          including applicable taxes, unless otherwise stated in your Benefit
          Sponsor terms and conditions or otherwise agreed to in writing between
          the parties. Before you pay any fees, you will have the opportunity to
          review and accept the fees that you will be charged. In order to
          access the Products and Services, you may be required to provide your
          payment information. You agree to promptly notify Inspire Mental
          Fitness PLLC of any changes to your Payment Method while any payments
          remain outstanding. You authorize Inspire Mental Fitness PLLC or a
          third-party payment processor to charge all fees for the Products and
          Services, including all applicable taxes, to the Payment Method. If
          you pay any fees with a credit card, we (or a third-party payment
          processor) may seek pre-authorization of your credit card account
          prior to purchase to verify that the credit card is valid and has the
          necessary funds or credit to cover your purchase. If we use a
          third-party payment processor, such as Stripe, their use of your
          personal information is subject to their applicable terms of service
          and privacy policy. For Stripe, those terms are available at
          https://stripe.com/legal and https://stripe.com/privacy.
          <br />
          <br />
          (c) In the course of your use of the Products or Services, Inspire
          Mental Fitness PLLC and its third-party payment processor may receive
          and use updated credit card information from your credit card issuer
          to prevent your Subscription from being interrupted by an outdated or
          invalid card. This information is provided to Inspire Mental Fitness
          PLLC and Inspire Mental Fitness PLLC’s third-party payment processor
          at the sole election of your credit card issuer. Your credit card
          issuer may give you the right to opt-out of the update service. Should
          you desire to do so, please contact your credit card issuer. You agree
          not to hold us responsible for banking charges incurred due to
          payments on your account.
        </p>
        <h2 className="fs-4 fw-bold">2.5 BENEFIT SPONSORS</h2>
        <p className="py-4">
          Many groups, including but not limited to employers, healthcare
          providers, health plans, universities, government entities, clubs /
          organizations,municipalities or hospitals (“Benefit Sponsor” or
          “Benefit Sponsors”) purchase and introduce the Products and Services
          to their employees, eligible dependents and members. In some cases,
          our Benefit Sponsors may supplement these Terms with their own terms
          and conditions, which may include additional terms around subscription
          redemption, usage or supplementary payment for access to Products and
          Services. In such an event, the Benefit Sponsor terms and conditions
          will also apply to your use of the Products and Services. In the event
          of any conflict with such additional terms and these Terms, the
          additional terms will prevail.
        </p>
        <h2 className="fs-4 fw-bold"> 2.6 CHANGING FEES AND CHARGES</h2>
        <p className="py-4">
          We reserve the right to change our subscription fees, plans or adjust
          pricing for our Products and Services or any components thereof in any
          manner and at any time as we may determine in our sole discretion.
          Except as otherwise expressly provided for in these Terms, any price
          changes or changes to your subscription plan will take effect
          following notice to you.
        </p>
        <h2 className="fs-4 text-gray-700 fw-bold">3. CANCELING MEMBERSHIP</h2>
        <h3 className="fs-4 py-4 fw-bold">3.1 CANCELLATION BY US</h3>
        <p>
          We may suspend or terminate your use of the Products and/or Services
          as a result of your fraud or breach of any obligation under these
          Terms. A breach of these Terms, includes without limitation, the
          unauthorized copying or download of our audio or video content from
          the Products or Services or recording of the Services. Such
          termination or suspension may be immediate and without notice. If we
          terminate your account, you may receive a pro rata refund of fees that
          you prepaid for the Services. Your access to the Products or Services
          may be terminated if the relationship between Inspire Mental Fitness
          PLLC and your employer or provider terminates or expires, or if your
          relationship with your employer or provider ends. If this happens,
          Inspire Mental Fitness PLLC will use reasonable efforts to give you
          seven (7) days’ notice before access to the Products or Services is
          terminated.
        </p>
        <h2 className="fs-4py-4 fw-bold">3.2 CANCELLATION BY YOU</h2>
        <p className="pb-4">
          (a) You may cancel your Subscription at any time. Cancellation of a
          monthly Subscription is effective at the end of the applicable monthly
          period and cancellation of an annual Subscription is effective at the
          end of the applicable annual period. Please make any such cancellation
          by visiting here or emailing helpdesk@inspirementalfitness.com.
          <br /> <br />
          (b) Please note that if you purchase a Subscription through the Apple
          iTunes Store or our iPhone application, you may cancel your
          Subscription by canceling automatic renewal of paid In App
          Subscriptions by selecting Manage App Subscriptions in your Apple
          Account settings and selecting the Subscription you want to modify. If
          you purchase a Subscription through the Google Play store you may
          cancel automatic renewals in account settings under Subscriptions in
          the Google Play app, or according to the current process outlined by
          Google Play. If you purchase a Subscription via Apple or Google, you
          may be subject to their additional terms.
        </p>
        <h2 className="fs-4py-4 fw-bold">3.3 CANCELLATION FEES</h2>
        <p>
          Some features of the Products and Services are subject to certain
          cancellation fees, as disclosed via the Products and Services. For
          example, such cancellation fees may be owed if you miss a scheduled
          therapy or psychiatry session, and fail to provide the required
          advanced notice, as communicated to you in advance. We may suspend or
          terminate access to the Products and Services for any account for
          which any amount is due but unpaid. In addition to the amount due, a
          delinquent account will be charged with fees or charges that are
          incidental to any chargeback or collection of any unpaid amount,
          including collection fees.
        </p>

        <h2 className="fs-4py-4  text-secondary fw-bold">
          4. PROHIBITED USE OF THE PRODUCTS AND SERVICES
        </h2>
        <p>
          By using the Products and Services you agree not to: <br />
          <br />
          (a) copy, store, reproduce, transmit, modify, alter, reverse-engineer,
          emulate, decompile, or disassemble the Products or Services in any
          way, or create derivative works of the Products or Services; <br />
          <br />
          (b) record the Services, including any coaching, therapy or psychiatry
          session; <br />
          <br />
          (c) use the Products or Services (or any part of them) to create any
          tool or software product that can be used to create software
          applications of any nature whatsoever; <br />
          <br />
          (d) upload, post, email or otherwise send or transmit or introduce any
          material that contains software viruses or any other computer code,
          files or programs designed to interrupt, harm, damage, destroy or
          limit the functionality of any computer software or hardware or
          equipment linked directly or indirectly with the Products or Services;{" "}
          <br />
          <br />
          (e) interfere with the servers or networks underlying or connected to
          the Products and Services or to violate any of the procedures,
          policies or regulations of networks connected to the Products or
          Services; <br />
          <br />
          (f) access the Products or Services in an unauthorized manner,
          including in violation of any local, state, national or international
          law <br />
          <br />
          (g) circumvent any territorial restrictions applied to the Products or
          Services; <br />
          <br />
          (h) perform any fraudulent activity including impersonating any other
          person or entity while using the Products or Services; <br />
          <br />
          (i) conduct yourself in an offensive manner while using the Products
          or Services (including, but not limited to, bullying, harassing, or
          using hate speech or degrading comments about things like race,
          religion, culture, sexual orientation, gender or identity, age,
          disability, or serious disease); <br />
          <br />
          (j) use the Products or Services for any illegal, immoral or harmful
          purpose (including, without limitation, unlawful, harassing, libelous,
          invasion of another’s privacy, abusive, threatening or obscene
          purposes); <br />
          <br />
          (k) use the Products or Services for any purposes related to
          scientific research, analysis or evaluation of the Products or
          Services without the express written consent of Inspire Mental Fitness
          PLLCce; <br />
          <br />
          (l) rent, lease, loan, make available to the public, sell or
          distribute the Products or Services in whole or in part or use the
          Products or Services except for your own personal use; <br />
          <br />
          (m) violate, or encourage others to violate, any right of a third
          party, including by infringing or misappropriating any third-party
          intellectual property right; <br />
          <br />
          (n) sell or otherwise transfer access granted under these Terms or any
          Materials (as defined below) or any right or ability to view, access,
          or use any Materials; or <br />
          <br />
          (o) attempt to do any of the acts described in this Section or as
          otherwise prohibited by these Terms or assist or permit any person in
          engaging in any of the acts described in this Section or otherwise as
          prohibited by the Terms. <br />
          <br />
          We reserve the right to immediately terminate your access to or use of
          our Products or Services if we believe, in our sole discretion, that
          you exhibit such behavior or you violate or attempt to violate any
          laws or breach these Terms. <br />
          <br />
          By breaching the provisions of this Section, you may commit a criminal
          offense under Applicable Law. We may report any such breach to the
          relevant law enforcement authorities and we may cooperate with those
          authorities by disclosing your identity to them. In the event of such
          a breach, your right to use the Products and Services will cease
          immediately. <br />
          <br />
          We reserve the right to contact emergency services to the extent that
          we believe, at our sole discretion, that you pose an imminent threat
          of harm to yourself, to property, or to another person.
        </p>
        <h2 className="fs-4py-4  text-secondary fw-bold">
          5. MATTERS OF OWNERSHIP
        </h2>
        <p>
          Subject to the limitations set forth in these Terms, Inspire Mental
          Fitness PLLC grants you a limited, non-exclusive, non-transferable,
          non-sublicensable, revocable license to stream, download and make
          personal non-commercial use of the Products and Services. The
          Products, including the source code for the Products and any
          information derived therefrom, is proprietary to, and constitutes the
          intellectual property (including without limitation a valuable trade
          secret) of Inspire Mental Fitness PLLC and its licensors and
          suppliers.
        </p>
        <h2 className="fs-4py-4  text-secondary fw-bold">5.1 COPYRIGHT</h2>
        <p>
          (a) All materials (including but not limited to software and content
          whether downloaded or not) contained in the Products and Services
          (“Materials”), are owned by Inspire Mental Fitness PLLC (or our
          affiliates and/or third-party licensors, where applicable), unless
          indicated otherwise. The Materials are valuable property and that
          other than any specific and limited license for use of such Materials,
          you will not acquire any ownership rights in or to such Materials. The
          Materials may not be used except as provided for in these Terms, and
          any other relevant terms and conditions provided to you, without our
          prior written consent. <br />
          <br />
          (b) Materials on or in the Products or Services are the property of
          Inspire Mental Fitness PLLC or third-party licensors and, without
          prejudice to any and all other rights and remedies available, each
          such licensor has the right to directly enforce relevant provisions of
          Section 11 against you.
          <br />
          <br />
          (c) Audio or video content from Inspire Mental Fitness PLLC not
          explicitly indicated as downloadable may not be downloaded or copied
          from the Products, Services or any Device.
          <br />
          <br />
          (d) The Products and Services are not intended for your commercial
          use. Commercial advertisements, affiliate links, and other forms of
          solicitation may be removed by us without notice and may result in
          termination of privileges. You must not use any part of the Materials
          for commercial purposes without obtaining a written license to do so
          from us. Materials may not be copied or distributed, or republished,
          or transmitted in any way, without our prior written consent. Any
          unauthorized use or violation of these Terms immediately and
          automatically terminates your right to use the Products and Services
          and may subject you to legal liability. Appropriate legal action may
          be taken for any illegal or unauthorized use of the Products or
          Services. <br />
          <br />
          (e) You may not otherwise download, display, copy, reproduce,
          distribute, modify, perform, transfer, create derivative works from,
          sell or otherwise exploit any content, code, data or materials in the
          Products or Services. If you make other use of the Products or
          Services, or the content, code, data or materials thereon, except as
          otherwise provided above, you may violate copyright and other laws of
          the United States, other countries, as well as applicable state laws
          and may be subject to liability for such unauthorized use. Inspire
          Mental Fitness PLLC will enforce its intellectual property rights to
          the fullest extent of the law, including the seeking of criminal
          prosecution.
        </p>
        <h2 className="fs-4py-4 fw-bold">5.2 TRADEMARKS</h2>
        <p>
          Inspire Mental Fitness®, the Inspire Mental Fitness PLLC logo and all
          other Inspire Mental Fitness PLLC product or service marks are
          trademarks of Inspire Mental Fitness PLLC. All intellectual property,
          other trademarks, logos, images, product and company names displayed
          or referred to on or in the Products and Services are the property of
          their respective owners. Nothing grants you any license or right to
          use, alter or remove or copy such material. Your misuse of the
          trademarks displayed or referred to on or in the Products and Services
          is strictly prohibited. Inspire Mental Fitness PLLC will enforce its
          trademark rights to the fullest extent of the law, including the
          seeking of criminal prosecution.
        </p>
        <h2 className="fs-4py-4  text-secondary fw-bold">
          6. AVAILABILITY OF PRODUCTS AND SERVICES
        </h2>
        <p>
          Although we aim to offer you the best service possible, we make no
          promise that the Products and Services will meet your requirements and
          we cannot guarantee that the Products and Services will be fault free.
          If a fault occurs in the Products or Services, please report it to us
          at helpdesk@inspirementalfitness.com and we will review your concern
          and, where we determine it is appropriate to do so, correct the fault.
          If the need arises, we may suspend access to the Products and Services
          while we address the fault. We will not be liable to you if the
          Products and Services are unavailable for a commercially reasonable
          period of time.
          <br />
          <br />
          Your access to the Products and Services may be occasionally
          restricted to allow for repairs, maintenance or the introduction of
          new Services or Products. We will restore the Products and Services as
          soon as we reasonably can. In the event that the Products and Services
          are unavailable, our usual Order and cancellation deadlines apply;
          please notify us of changes to your Order by emailing us at
          helpdesk@inspirementalfitness.com
          <br />
          <br />
          We may change or discontinue, temporarily or permanently, any feature,
          component, or content of the Products or Services at any time without
          notice to you. We reserve the right to determine the timing and
          content of software updates, which may be automatically downloaded and
          installed by us, without prior notice to you. Apart from the pro rata
          refund of any prepaid fees in Section 3.1, you agree that Inspire
          Mental Fitness PLLC will not be liable to you for any unavailability,
          modification, suspension or discontinuance of any feature or component
          of the Products and Services.
          <br />
          <br />
          Notwithstanding anything to the contrary in these Terms, Inspire
          Mental Fitness PLLC’s affiliated providers and partners, will retain
          coaching records and medical records (as applicable) with respect to
          your use of the Services for a period of ten years from the date of
          your last use of the Service or as required by Applicable Law, and
          provide you access thereto in accordance with Applicable Law.
        </p>
        <h2 className="fs-4 text-secondary py-4 fw-bold">7. USER MATERIAL</h2>
        <p>
          7.1 The Products and Services may let you submit material to us, for
          example, you may be able to post comments or images in certain
          functions or features of the Product or Services. “User Material”
          refers to any publicly available material of any kind that you submit
          to us, including text, files, images, photos, video, sounds and
          musical or literary works. User Material does not include the account
          information, Product or Service purchase, or Product or Service use
          information which you provide in registering for and using Products or
          Services. If you review or submit User Material, you are agreeing to
          do so in accordance with these Terms. If you do not want to review or
          submit User Material in accordance with these Terms, then you should
          not do so.
          <br />
          <br />
          7.2 We do not systematically review all User Material submitted by you
          or other users. However, we reserve the right to, and may from time to
          time, monitor any and all information transmitted or received through
          the Products or Services for operational and other purposes. If at any
          time we choose to monitor such information, we assume no
          responsibility or liability for content or any loss or damage incurred
          as a result of the use of content. During monitoring, information may
          be examined, recorded, copied, and used in accordance with our Privacy
          Policy. We are not responsible for the content of User Material
          provided by you or any other user. We do not necessarily endorse any
          opinion contained in such material. We make no warranties or
          representations, express or implied, about User Material, including as
          to its legality or accuracy.
          <br />
          <br />
          7.3 We reserve the right, in our sole discretion, to refuse to post or
          to remove or edit any of your User Material, or to restrict, suspend,
          or terminate your access to all or any part of the Products or
          Services, particularly where User Material breaches this Section, and
          we may do this with or without giving you any prior notice.
          <br />
          <br />
          7.4 We may link User Material or parts of User Material to other
          material, including material submitted by other users or created by
          Inspire Mental Fitness PLLC or other third parties. We may use User
          Material for our internal business purposes, for example, to examine
          trends or categories or to promote, market or advertise Inspire Mental
          Fitness PLLC. We may indirectly commercially benefit from use of your
          User Material.
          <br />
          <br />
          7.5 Each time you submit User Material to us, you represent and
          warrant to us as follows: <br />
          <br />
          (a) You own your User Material or have the right to submit it, and in
          submitting it you will not be infringing any rights of any third
          party, including intellectual property rights (such as copyright or
          trademark), privacy or publicity rights, rights of confidentiality or
          rights under contract. <br />
          <br />
          (b) Your User Material is not illegal, obscene, defamatory,
          threatening, pornographic, harassing, hateful, racially or ethnically
          offensive, and does not encourage conduct that would be considered a
          criminal offense, and does not give rise to civil liability, violate
          any law, or is otherwise deemed inappropriate. <br />
          <br />
          (c) Your User Material does not advertise any product or service or
          solicit any business. <br />
          <br />
          (d) Your User Material does not identify any individual (including by
          way or name, address or a still picture or video) under the age of 18
          and if User Material identifies any individual over the age of 18, you
          have that person’s consent to being identified in exactly that way in
          your User Material; and in submitting your User Material you are not
          impersonating any other person. <br />
          <br />
          (e) You will not collect email addresses of users for the purpose of
          sending unsolicited email. <br />
          <br />
          (f) You will not engage in criminal or tortious activity, including
          fraud, spamming, spimming, sending of viruses or other harmful files,
          copyright infringement, patent infringement, or theft of trade secrets
          or attempt to impersonate another user or person. <br />
          <br />
          (g) You will not engage in any automated use of the system, such as
          using scripts to alter our content. <br />
          <br />
          (h) You will not access, tamper with, or use non-public areas of the
          Products or Services, Inspire Mental Fitness PLLC computer systems, or
          the technical delivery systems of Inspire Mental Fitness PLLC
          providers. <br />
          <br />
          (i) Except as necessary to maintain your own computer security by use
          of commercial-off-the-shelf antivirus or anti-malware products, you
          will not attempt to probe, scan, or test the vulnerability of the
          Products or Services or any other Inspire Mental Fitness PLLC system
          or network or breach any security or authentication measures. <br />
          <br />
          7.6 We are entitled to identify you to third parties who claim that
          their rights have been infringed by User Material you have submitted.{" "}
          <br />
          <br />
          7.7 User Material is not considered to be confidential. You agree not
          to submit any content as User Material in which you have any
          expectation of privacy. We do not claim any ownership rights in User
          Material. However, by submitting User Material you hereby grant
          Inspire Mental Fitness PLLC an irrevocable, perpetual, non-exclusive,
          royalty free, worldwide license to use, telecast, copy, perform,
          display, edit, distribute and otherwise exploit the User Material you
          post on the Products, or any portion thereof, and any ideas, concepts,
          or know how contained in the User Material, with or without
          attribution, and without the requirement of any permission from or
          payment to you or to any other person or entity, in any manner
          (including, without limitation, for commercial, publicity, trade,
          promotional, or advertising purposes) and in any and all media now
          known or hereafter devised, and to prepare derivative works of, or
          incorporate into other works, such User Material, and to grant and
          authorize sublicenses of the foregoing without any payment of money or
          any other form of consideration to you or to any third party. Inspire
          Mental Fitness PLLC may include your User Material in Inspire Mental
          Fitness PLLC’s distribution content that is made available to others
          through the Products. Be aware that Inspire Mental Fitness PLLC has no
          control over User Material once it leaves the Products, and it is
          possible that others may duplicate material found on the Products,
          including, but not limited to, on other sites on the Internet. You
          represent and warrant that you own or otherwise control the rights to
          your User Material. You agree to indemnify Inspire Mental Fitness PLLC
          and its affiliates for all claims arising from or in connection with
          any claims to any rights in your User Material or any damages arising
          from your User Material. <br />
          <br />
          7.8 Any inquiries, feedback, suggestions, ideas, other information
          which is not part of your use of the Products and Services or User
          Material that you provide to us (collectively, “Submissions”) will be
          treated as non-proprietary and non-confidential. By transmitting,
          uploading, posting, e-mailing, or otherwise submitting Submissions to
          the Products and Services, you grant, and you represent and warrant
          that you have the right to grant, to Inspire Mental Fitness PLLC an
          irrevocable, perpetual, non-exclusive, royalty free, worldwide license
          to use, telecast, copy, perform, display, edit, distribute and
          otherwise exploit the Submissions, or any portion thereof and any
          ideas, concepts, or know how contained in the Submissions, with or
          without attribution, and without the requirement of any permission
          from or payment to you or to any other person or entity, in any manner
          (including, without limitation, for commercial, publicity, trade,
          promotional, or advertising purposes) and in any and all media now
          known or hereafter devised, and to prepare derivative works of, or
          incorporate into other works, such Submissions, and to grant and
          authorize sublicenses of the foregoing without any payment of money or
          any other form of consideration to you or to any third party. You also
          acknowledge that your Submissions will not be returned to you and that
          Inspire Mental Fitness PLLC has no obligation to acknowledge receipt
          of or respond to any Submissions. If you make a Submission, you
          represent and warrant that you own or otherwise control the rights to
          your Submission. You agree to indemnify Inspire Mental Fitness PLLC
          and its affiliates for all claims arising from or in connection with
          any claims to any rights in any Submission or any damages arising from
          any Submission.
        </p>
        <h2 className="fs-4fw-bold py-4 text-gray-600">
          8. THIRD PARTY TERMS AND LINKS
        </h2>
        <p>
          8.1 At times, we may contract with a third party to support the
          Products or Services we offer to you or to directly provide Services
          to you, such as Employee Assistance Program (“EAP”) services. In such
          instances, your use of the third party’s products or services will be
          subject to their applicable terms of service and privacy policy, which
          will be presented to you upon engagement with their product or
          service. To the extent that there is a conflict between these Terms
          and the terms of use for any of our third-party contracted entities,
          the third-party terms will apply. We reserve the right to change
          third-party providers at our sole discretion. <br />
          <br />
          8.2 The Products and Services may integrate, be integrated into, or be
          provided in connection with third-party products, services and
          content. As part of such integration we may transfer your information
          to the applicable third party service. These third-party services are
          not under our control, and, to the fullest extent permitted by law, we
          are not responsible for any third party service’s use of your exported
          information. <br />
          <br />
          8.3 We may provide links to other websites or services for you to
          access. Any access is at your sole discretion and for your information
          only. We do not review or endorse any of those third-party websites or
          services. We are not responsible in any way for: (a) the availability
          of; (b) the privacy practices of; (c) the content, advertising,
          products, goods or other materials or resources on or available from;
          or (d) the use to which others make of these other websites or
          services. We are also not responsible for any damage, loss or offense
          caused or alleged to be caused by, or in connection with, the use of
          or reliance on such websites or services. <br />
          <br />
          8.4 You may link to our home page, provided you do so in a way that is
          fair and legal and does not damage our reputation or take advantage of
          it, but you must not establish a link in such a way as to suggest any
          form of association, approval or endorsement on our part where none
          exists. You must not establish a link from any website that is not
          owned by you. The Products and Services must not be framed on any
          other website, nor may you create a link to any part of the Products
          and Services unless you have written consent to do so from Inspire
          Mental Fitness PLLC. We reserve the right to withdraw linking
          permission with written notice. The website from which you are linking
          must comply in all respects with Section 4. If you wish to make any
          use of material on or in the Products or Services other than that set
          out above, please address your request to
          helpdesk@inspirementalfitness.com. <br />
        </p>
        <h2 className="py-4 fw-bold fs-4text-gray-600">
          9. ASSUMPTION OF RISK
        </h2>
        <p>
          By granting you the right to use the Products or Services, the Inspire
          Mental Fitness PLLC Entities (as defined in Section 15) do not assume
          any obligation or liability with respect to your health or your
          physical activity or condition. In no event will the Inspire Mental
          Fitness PLLCce Entities be liable for any death or bodily injury that
          you suffer, or that you cause to any third party, in connection with
          your use of the Products or Services or any activity you undertake in
          connection therewith. As between you and the Inspire Mental Fitness
          PLLC Entities, you are solely responsible for your use of the Products
          and Services and your health and medical conditions and treatment
          related thereto. The Inspire Mental Fitness PLLC Entities will have no
          liability for any unauthorized disclosure of your personally
          identifiable information caused by your actions or omissions. <br />
          <br />
          EXCEPT AS OTHERWISE EXPRESSLY SET FORTH IN THIS AGREEMENT, YOU AGREE
          THAT: (a) IF YOU ARE IN NEED OF OR ARE SEEKING MEDICAL TREATMENT, YOU
          SHOULD CONTACT YOUR HEALTHCARE PROVIDER. IF YOU ARE HAVING THOUGHTS OF
          HARMING OR KILLING YOURSELF, PLEASE CALL OR TEXT 988, THE SUICIDE AND
          CRISIS LIFELINE, AND IF YOU ARE EXPERIENCING A MEDICAL OR MENTAL
          HEALTH EMERGENCY, PLEASE CONTACT 911 (OR YOUR LOCAL EQUIVALENT) OR GO
          TO THE NEAREST EMERGENCY ROOM; <br />
          <br />
          (b) INSPIRE MENTAL FITNESS PLLC (WITH THE EXCEPTION OF ITS AFFILIATED
          MEDICAL PROVIDERS) IS NOT A LICENSED MEDICAL CARE PROVIDER; DOES NOT
          PROVIDE MEDICAL TREATMENT, ADVICE, OR DIAGNOSIS; HAS NO EXPERTISE IN
          DETERMINING THE EFFECT OF ANY SPECIFIC TREATMENT ON A MEDICAL
          CONDITION; AND IS NOT YOUR HEALTHCARE PROVIDER; <br />
          <br />
          (c) INSPIRE MENTAL FITNESS PLLC IS NOT AND DOES NOT PROVIDE 911 OR
          OTHER EMERGENCY SERVICES AND MAY NOT CONTACT YOU OR ANYONE ON YOUR
          BEHALF WITH RESPECT TO YOUR MEDICAL CONDITION OR TREATMENT; <br />
          <br />
          (d) ANY WRITTEN MATERIAL PROVIDED BY INSPIRE MENTAL FITNESS PLLC AND
          NOT BY ITS AFFILIATED MEDICAL PROVIDERS THROUGH THE PRODUCTS AND
          SERVICES IS FOR INFORMATIONAL PURPOSES ONLY AND IS NOT INTENDED TO
          REPLACE THE RELATIONSHIP BETWEEN YOU AND YOUR PHYSICIAN OR OTHER
          HEALTHCARE PROVIDER; <br />
          <br />
          (e) YOU SHOULD ALWAYS CONSULT A PHYSICIAN IF YOU HAVE ANY QUESTIONS
          REGARDING A MEDICAL CONDITION; <br />
          <br />
          (f) NEVER DISREGARD PROFESSIONAL MEDICAL ADVICE OR DELAY IN SEEKING IT
          BECAUSE OF SOMETHING YOU HAVE READ OR RECEIVED USING THE PRODUCTS AND
          SERVICES; <br />
          <br />
          (g) THE INSPIRE MENTAL FITNESS PLLC ENTITIES ASSUME NO LIABILITY WITH
          RESPECT TO ANY SURVEY OR RESEARCH/MEDICAL PROGRAM OR STUDY WITH WHICH
          YOU MAY BE USING THE PRODUCTS OR SERVICES; AND <br />
          <br />
          (h) THE INSPIRE MENTAL FITNESS PLLC ENTITIES ARE NOT RESPONSIBLE FOR
          THE ACCURACY, RELIABILITY, EFFECTIVENESS, OR CORRECT USE OF
          INFORMATION YOU RECEIVE THROUGH OR AS GENERATED BY THE PRODUCTS.
        </p>
        <h2 className="fs-4fw-bold py-4 ">9.1 Meditation Assumption of Risk</h2>
        <p>
          While there is research that meditation can assist in the prevention
          and recovery process for a wide array of conditions as well as in
          improving some performance and relationship issues, Inspire Mental
          Fitness PLLC makes no guarantees that the Products and Services
          provide a physical or therapeutic benefit. There have been rare
          reports where people with certain psychiatric conditions like anxiety
          and depression have experienced worsening conditions in conjunction
          with intensive meditation practice. People with existing mental health
          conditions should speak with their health care providers before
          starting a meditation practice.
        </p>
        <h2 className="fs-4fw-bold py-4 ">9.2 Coaching Assumption of Risk</h2>
        <p>
          If you access and engage with our mental health coaching service, you
          will work with mental health coaches who will provide personal
          support, encouragement and motivation (“Coaches”). The Coaches who
          provide the mental health coaching services do not provide medical
          advice, professional clinical counseling or other clinical or
          psychotherapy services. None of the advice provided by the Coaches,
          the Website or the Products should be considered medical or clinical
          advice and none of such information is intended as medical or clinical
          advice. You should always talk to your physician or other other
          healthcare professionals for diagnosis and treatment, including
          information regarding which drugs or treatment may be appropriate for
          you. Do not disregard professional medical advice or delay seeking
          professional advice because of information you have read on our
          Website, Apps or received through a Coach. Do not stop taking any
          medications without speaking to your physician or other healthcare
          professional. The information provided in or through our Website, Apps
          or the Coaches is not intended to be a substitute for professional
          medical advice, diagnosis or treatment that can be provided by your
          doctor or physician, nurse, or any other medical or clinical
          healthcare professional.
        </p>
        <h2 className="fs-4fw-bold  text-secondary py-4 ">
          10. WARRANTIES AND DISCLAIMERS
        </h2>
        <p>
          10.1 THE PRODUCTS AND SERVICES AND ALL MATERIALS AND CONTENT AVAILABLE
          THROUGH THE PRODUCTS AND SERVICES ARE PROVIDED “AS IS” AND ON AN “AS
          AVAILABLE” BASIS. INSPIRE MENTAL FITNESS PLLC DISCLAIMS ALL WARRANTIES
          OF ANY KIND, WHETHER EXPRESS OR IMPLIED, RELATING TO THE PRODUCTS AND
          SERVICES AND ALL MATERIALS AND CONTENT AVAILABLE THROUGH THE PRODUCTS
          AND SERVICES, INCLUDING: (A) ANY IMPLIED WARRANTY OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE, TITLE, QUIET ENJOYMENT, OR
          NON-INFRINGEMENT; AND (B) ANY WARRANTY ARISING OUT OF COURSE OF
          DEALING, USAGE, OR TRADE. INSPIRE MENTAL FITNESS PLLC DOES NOT WARRANT
          THAT THE PRODUCTS AND SERVICES OR ANY PORTION OF THE PRODUCTS AND
          SERVICES, OR ANY MATERIALS OR CONTENT OFFERED THROUGH THE PRODUCTS AND
          SERVICES, WILL BE UNINTERRUPTED, OR FREE OF ERRORS, VIRUSES, OR OTHER
          HARMFUL COMPONENTS, AND INSPIRE MENTAL FITNESS PLLC DOES NOT WARRANT
          THAT ANY OF THOSE ISSUES WILL BE CORRECTED. NO ADVICE OR INFORMATION,
          WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM THE PRODUCTS OR SERVICES
          OR INSPIRE MENTAL FITNESS PLLC ENTITIES OR ANY MATERIALS OR CONTENT
          AVAILABLE THROUGH THE PRODUCTS AND SERVICES WILL CREATE ANY WARRANTY
          REGARDING ANY OF THE INSPIRE MENTAL FITNESS PLLC ENTITIES OR THE
          PRODUCTS AND SERVICES THAT IS NOT EXPRESSLY STATED IN THESE TERMS. YOU
          UNDERSTAND AND AGREE THAT YOU USE ANY PORTION OF THE PRODUCTS AND
          SERVICES AT YOUR OWN DISCRETION AND RISK, AND THAT WE ARE NOT
          RESPONSIBLE FOR ANY DAMAGE TO YOUR PROPERTY (INCLUDING YOUR COMPUTER
          SYSTEM OR MOBILE DEVICE USED IN CONNECTION WITH THE SERVICE) OR ANY
          LOSS OF DATA. THE LIMITATIONS, EXCLUSIONS AND DISCLAIMERS IN THIS
          SECTION APPLY TO THE FULLEST EXTENT PERMITTED BY LAW. <br />
          <br />
          APPLICABLE LAW IN SOME JURISDICTIONS MAY IMPLY WARRANTIES, CONDITIONS,
          OR GUARANTEES OR IMPOSE OBLIGATIONS WHICH PROVIDE YOU WITH CERTAIN
          CONSUMER RIGHTS. THESE TERMS ARE IN NO WAY INTENDED TO RESTRICT THOSE
          RIGHTS AND INSPIRE MENTAL FITNESS PLLC DOES NOT DISCLAIM ANY WARRANTY
          OR OTHER RIGHT THAT INSPIRE MENTAL FITNESS IS PROHIBITED FROM
          DISCLAIMING UNDER APPLICABLE LAW. <br />
          <br />
          10.2 Inspire Mental fitness PLLC meditation, mindfulness, sleep and
          movement content and mental health coaching should not be considered
          health care, a medical device, or considered medical advice. Only your
          physician or other health care provider can provide medical advice.
          The advice and other materials we make available are intended to
          support the relationship between you and your healthcare providers and
          not replace it. We are not liable or responsible for any consequences
          of your having read or been told about such advice or other materials
          as you assume full responsibility for your decisions and actions. In
          particular, to the fullest extent permitted by law, we make no
          representation or warranties about the accuracy, completeness, or
          suitability for any purpose of the advice, other materials and
          information published as part of the Products and Services. <br />
          <br />
          10.3 To the extent that you participate in any movement content
          featured in the Products or Services, you represent and warrant that
          you are of adequate physical health to perform such activities and
          have no disability or condition that would make such movement
          dangerous. You should consult a licensed physician prior to beginning
          or modifying any exercise program that you undertake especially if you
          have a prior injury, a history of heart disease, high blood pressure,
          other chronic illness, or condition. You acknowledge that Inspire
          Mental Fitness PLLC has advised you of the necessity of doing so.
        </p>
        <h2 className="fs-4fw-bold py-4  text-gray-600">
          11. DIGITAL MILLENNIUM COPYRIGHT ACT (“DMCA”) NOTICE
        </h2>
        <p>
          11.1 We are committed to complying with copyright and related laws,
          and we require all users of the Products and Services to do the same.
          This means you may not store any material or content on, or
          disseminate any material or content over, the Products or Services in
          any manner that infringes on third-party intellectual property rights,
          including rights granted by copyright law. You may not post, modify,
          distribute, or reproduce in any way any copyrighted material,
          trademarks, or other proprietary information belonging to others
          without obtaining the prior written consent of the owner of such
          proprietary rights. It is our policy to terminate privileges of any
          user who repeatedly infringes the copyright rights of others upon
          receipt of proper notification to us by the copyright owner or the
          copyright owner’s legal agent.
          <br />
          <br />
          11.2 Owners of copyrighted works in the United States who believe that
          their rights under copyright law have been infringed may take
          advantage of certain provisions of the US Digital Millennium Copyright
          Act of 1998 (the “DMCA”) to report alleged infringements.
          <br />
          <br />
          11.3 If you feel that a posted message is objectionable or infringing,
          we encourage you to contact us immediately. Upon our receipt of a
          proper notice of claimed infringement under the DMCA, we will respond
          expeditiously to remove, or disable access to, the material claimed to
          be infringing and will follow the procedures specified in the DMCA to
          resolve the claim between the notifying party and the alleged
          infringer who provided the content in issue. Our designated agent
          (i.e., the proper party) to whom you should address such notice is
          listed below.
          <br />
          <br />
          11.4 If you believe that your work has been copied and posted on the
          Products or Services in a way that constitutes copyright infringement,
          please provide our designated agent with the following information:{" "}
          <br />
          <br />
          (a) An electronic or physical signature of the person authorized to
          act on behalf of the owner of the copyright or other intellectual
          property interest; <br />
          <br />
          (b) A description of the copyrighted work or other intellectual
          property that you claim has been infringed; <br />
          <br />
          (c) A description of where the material that you claim is infringing
          is located on the Products or Services; <br />
          <br />
          (d) Your address, telephone number, and email address; <br />
          <br />
          (e) A statement by you that you have a good faith belief that the
          disputed use is not authorized by the copyright or intellectual
          property owner, its agent, or the law; and <br />
          <br />
          (f) A statement by you, made under penalty of perjury, that the
          information contained in your report is accurate and that you are the
          copyright or intellectual property owner or authorized to act on the
          copyright or intellectual property owner’s behalf.
          <br />
          <br />
          (g) Our designated agent for notice of claims of copyright
          infringement can be reached as follows: By Mail: Inspire Mental
          Fitness PLLC Attn: Copyright Agent 62 Sejon Drive, Sayville New York
          11782 By Email: bvetri@bvetrilaw.com Subject line: DMCA
        </p>
        <h2 className="fs-4py-4 fw-bold  text-gray-600">
          12. ELECTRONIC COMMUNICATIONS CONSENT
        </h2>
        <p>
          Email, text messaging, push notifications and other electronic
          communication (“Electronic Communications”), such as posting notices
          on the Products or Services allow Inspire Mental Fitness PLLC to
          exchange information with you efficiently in connection with the
          provisioning of our Products and Services, product information,
          appointment reminders, and links to surveys. <br />
          <br />
          Your use of the Products and Services means that you agree and consent
          to the use of Electronic Communications as an acceptable form of
          communication for the purposes of receiving our Products and Services
          and product information. By providing us with your phone number, you
          consent to receiving SMS/text message communications from us related
          to the Products and/or Services, including marketing and promotional
          messages, even if the phone number you provide is registered on any
          federal or state Do-Not-Call registry. Standard text messaging charges
          applied by your cell phone carrier will apply to text messages we
          send. You may opt out of receiving SMS/ text message communications
          from us at any time by replying “STOP”. We will send a final SMS
          message to confirm that you have been unsubscribed and after this you
          will no longer receive SMS messages from us. <br />
          <br />
          You acknowledge that Electronic Communications may not be a completely
          secure means of communication, and there may be the potential for such
          communications to be accessed in storage or during transmission. We
          will limit the amount and type of confidential information disclosed
          in un-encrypted Electronic Communications in compliance with our
          privacy policy. <br />
          <br />
          Applicable laws require that some of the information or communications
          we send to you should be in writing. You agree to transact with us
          electronically, and that communication with us will be mainly
          electronic. You acknowledge that all contracts, notices, information
          and other communications that we provide to you electronically comply
          with any legal requirement that such communications be in writing. You
          have the right to receive a paper copy of the communications. To
          receive a paper copy, please request it by emailing us at
          helpdesk@inspirementalfitness.com. Please be sure to state that you
          are requesting a copy of the particular communication. <br />
          <br />
          If you wish to change your email address, phone number, or modify your
          preferences regarding the use of email and text communication, please
          contact us at helpdesk@inspirementalfitness.com. You can also contact
          info@inspirementalfitness.com to unsubscribe from further
          communications. Unsubscribing from communication may impact your
          ability to use the Products or Services. <br />
          <br />
          We reserve the right, in our sole discretion, to discontinue the
          provision of your Electronic Communications, or to terminate or change
          the terms and conditions on which we provide Electronic
          Communications. We will provide you with notice of any such
          termination or change as required by law.
        </p>
        <h2 className="fs-4fw-bold py-4">13. INTERNATIONAL USE</h2>
        <p>
          If you are located outside of the United States, you may have access
          to our meditation, mindfulness, sleep and movement content and mental
          health health coaching only. The purpose of such content and mental
          health coaching is not the diagnosis, prevention, monitoring,
          prediction, prognosis, treatment or alleviation of disease. Any
          additional services, included but not limited to therapy or psychiatry
          services, are provided by our partners or affiliates and your
          engagement with such additional services is governed by additional
          terms and policies which will be presented to you when applicable.{" "}
          <br />
          <br />
          You may not export or re-export any Products except in full compliance
          with all Applicable Law, including in particular the Export
          Administration Regulations of the U.S. Department of Commerce. <br />
          <br />
          You may not access to the Products or Services or any features thereof
          from countries or territories where such access is illegal, banned or
          restricted, including in any sanctioned countries or territories.{" "}
          <br />
          <br />
          SOME JURISDICTIONS DO NOT ALLOW EXCLUSION OF CERTAIN TYPES OF
          WARRANTIES AND CONDITIONS OR LIMITATIONS ON CERTAIN TYPES OF DAMAGES,
          SO SOME OF THE DISCLAIMERS IN SECTION 10 OR LIMITATIONS IN SECTION
          15.3 MAY NOT APPLY TO YOU.
        </p>
        <h2 className="fs-4fw-bold py-4">
          14. DISPUTE RESOLUTION & BINDING ARBITRATION
        </h2>
        <p>
          PLEASE READ THE FOLLOWING PARAGRAPHS CAREFULLY, AS THEY REQUIRE YOU TO
          ARBITRATE DISPUTES WITH INSPIRE MENTAL FITNESS PLLC, AND LIMIT THE
          MANNER IN WHICH YOU CAN SEEK RELIEF FROM INSPIRE MENTAL FITNESS PLLC,
          INCLUDING A LIMITATION ON THE RIGHT TO LITIGATE CLAIMS IN A COURT OR
          BEFORE A JURY OR TO PARTICIPATE IN A CLASS ACTION OR REPRESENTATIVE
          ACTION WITH RESPECT TO A CLAIM. FOR PROCEDURES RELATED TO MASS
          ARBITRATIONS, PLEASE REVIEW SECTION G, BELOW. <br />
          <br />
          (a) Jury Trial Waiver. Except where prohibited by law, you and Inspire
          Mental Fitness PLLC waive any constitutional and statutory rights to
          go to court and have a trial in front of a judge or a jury. Rather,
          you and Inspire Mental fitness PLLC elect to have claims and disputes
          resolved by arbitration. In any litigation between you and Inspire
          Mental Fitness PLLC over whether to vacate or enforce an arbitration
          award, you and Inspire Mental Fitness PLLC waive all rights to a jury
          trial, and elect instead to have the dispute be resolved by a judge.
          <br />
          <br />
          (b) Class Action Waiver. WHERE PERMITTED UNDER THE APPLICABLE LAW, YOU
          AND INSPIRE MENTAL FITNESS PLLC AGREE THAT EACH MAY BRING CLAIMS
          AGAINST THE OTHER ONLY IN YOUR OR OUR INDIVIDUAL CAPACITY AND NOT AS A
          PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR CONSOLIDATED
          ACTION. If, however, this waiver of class or consolidated actions is
          deemed invalid or unenforceable, neither you nor Inspire Mental
          Fitness PLLC are entitled to arbitration; instead all claims and
          disputes will be resolved in a court as set forth in Section 15.9
          below.
          <br />
          <br />
          (c) Informal Dispute Resolution. We want to address your concerns
          without needing a formal legal case. Before filing a claim against
          Inspire Mental Fitness PLLC, you agree to try to resolve the dispute
          informally by contacting us via email to
          helpdesk@inspirementalfitness.com. We'll try to resolve the dispute
          informally by contacting you through email. If a dispute is not
          resolved within 30 days after submission, you or Inspire Mental
          Fitness PLLC may bring a formal proceeding subject to these Terms.
          <br />
          <br />
          (d) Applicability of Arbitration Agreement. All disputes arising out
          of, relating to, or in connection with these Terms or your use of the
          Products and Services, including claims related to privacy or data
          security, will be resolved through binding arbitration on an
          individual basis, except that you and Inspire Mental Fitness PLLC
          retain the right: <br />
          <br />
          (1) to bring an individual action informally (as provided in section c
          above) or in small claims court, or (2) seek injunctive or other
          equitable relief in a court of competent jurisdiction for the alleged
          unlawful use of copyrights, trademarks, trade names, logos, trade
          secrets, or patents. All submissions to the arbitrator, the
          proceedings, and the award shall be confidential, except as may
          lawfully be required in judicial proceedings relating to the
          arbitration or as otherwise required by law. <br />
          <br />
          (e) Arbitration Rules. The Federal Arbitration Act governs the
          interpretation and enforcement of this dispute-resolution provision.
          Arbitration will be initiated through the American Arbitration
          Association ("AAA"). If the AAA is not available to arbitrate, the
          parties will select an alternative arbitral forum. The then-current
          version of the AAA Consumer Arbitration Rules (“AAA Rules”) will
          govern the arbitration, except to the extent those rules conflict with
          these Terms. The AAA Rules are available online at www.adr.org or by
          calling the AAA at 1-800-778-7879. The arbitration will be conducted
          by a single neutral arbitrator. <br />
          <br />
          If the claim is for $10,000 or less, the party initiating the
          arbitration may choose whether the arbitration will be conducted (1)
          solely on the basis of documents submitted to the arbitrator; (2)
          through a non-appearance based telephonic hearing; or (3) by an
          in-person hearing as established by the AAA Rules in the county of
          your billing address. In the case of an in-person hearing, the
          proceedings will be conducted at a location which is reasonably
          convenient for both parties with due consideration of the ability to
          travel and other pertinent circumstances. If the parties are unable to
          agree on a location, the determination will be made by the arbitration
          institution.
          <br />
          <br />
          Your arbitration fees and your share of arbitrator compensation will
          be limited to those fees set forth in the AAA Rules with the remainder
          paid by Inspire Mental fitness PLLC. If the arbitrator finds that
          either the substance of your claim or the relief sought in the
          arbitration is frivolous or brought for an improper purpose (as
          measured by the standards set forth in Federal Rule of Civil Procedure
          11(b)), then the payment of all fees will be governed by the AAA
          Rules. In such case, you agree to reimburse Inspire Mental Fitness
          PLLCce for all monies previously disbursed by it that are otherwise
          your obligation to pay under the AAA Rules. Regardless of the manner
          in which the arbitration is conducted, the arbitrator will issue a
          reasoned written decision sufficient to explain the essential findings
          and conclusions on which the decision and award, if any, are based.
          The arbitrator may make rulings and resolve disputes as to the payment
          and reimbursement of fees or expenses at any time during the
          proceeding and upon request from either party made within 14 days of
          the arbitrator’s ruling on the merits. <br />
          <br />
          (f) Authority of Arbitrator. The arbitrator will have exclusive
          authority to decide the jurisdiction of the arbitrator, including any
          unconstitutional challenge or other challenge that the arbitration
          provision or the Agreement is void, voidable, or otherwise invalid.
          The arbitrator will also have the exclusive authority to determine the
          rights and liabilities, if any, of you and Inspire Mental Fitness
          PLLC. The dispute will not be consolidated with any other matters or
          joined with any other cases or parties. The arbitrator will have the
          authority to grant motions dispositive of all or part of any claim or
          dispute. The arbitrator will have the authority to award all remedies
          available under Applicable Law, the arbitral forum's rules, and the
          Terms. The arbitrator has the same authority to award relief on an
          individual basis that a judge in a court of law would have. The award
          of the arbitrator is final and binding upon you and Inspire Mental
          Fitness PLLC.
          <br />
          <br />
          (g) Additional Procedures for Mass Arbitrations. These Additional
          Procedures for Mass Arbitrations (in addition to the other provisions
          of this arbitration provision and the applicable AAA Rules) shall
          apply if twenty-five (25) or more similar disputes are asserted
          against Inspire Mental Fitness PLLC or against you by the same or
          coordinated counsel or are otherwise coordinated (collectively "Mass
          Arbitration"). These Additional Procedures for Mass Arbitrations are
          designed to lead to the streamlined and cost-effective resolution of
          claims and to ensure that large volume filings do not impose
          unnecessary burdens or impediments to the resolution and
          cost-effective adjudication of similar claims. You understand,
          acknowledge, and agree that Mass Arbitrations may delay resolution of
          your dispute. The parties agree that as part of initiating a Mass
          Arbitration, their counsel shall meet and confer in good faith in an
          effort to resolve the disputes, streamline procedures, address the
          exchange of information, modify the number of Disputes to be
          adjudicated, and conserve the parties' and the AAA's resources.
          <br />
          <br />
          If at least one hundred (100) disputes are submitted as part of the
          Mass Arbitration, counsel for each party shall each select fifty (50)
          disputes to be filed, assigned to different arbitrators (no arbitrator
          shall shall be assigned more than 3 disputes) and to proceed as cases
          in individual arbitrations. If a case is withdrawn before the issuance
          of an arbitration award, another claim shall be selected to proceed as
          part of this process. The remaining disputes shall not be filed or
          deemed filed in arbitration nor shall any arbitration fees be assessed
          or collected in connection with those claims. After this initial set
          of proceedings, counsel for the parties shall participate in a global
          mediation session with a retired federal or state court judge jointly
          selected by counsel in an effort to resolve the remaining disputes,
          and Inspire Mental Fitness PLLC shall pay the mediator's fee. If
          counsel cannot agree on a mediator, one will be selected by the
          Arbitrator.
          <br />
          <br />
          If at the end of the process described in the immediately preceding
          paragraph, twenty-five (25) or more similar disputes have not been
          resolved, then the remaining disputes shall be arbitrated subject to
          the AAA Supplementary Rules for Multiple Case Filings and the AAA
          Multiple Consumer Case Filing Fee Schedule. If fewer than twenty-five
          (25) disputes remain, the remaining disputes shall proceed
          individually.
          <br />
          <br />
          (h) Enforceability. If any portion of this Section 14 is found to be
          unenforceable or unlawful for any reason, the unenforceable or
          unlawful provision will be severed from these Terms and severance of
          the unenforceable or unlawful provision will have no impact whatsoever
          on the remainder of this Section 14.
          <br />
          <br />
          (i) Opt-out. YOU MAY OPT-OUT OF THIS ARBITRATION AGREEMENT. If you do
          so, neither you nor Inspire Mental Fitness PLLC can force the other to
          arbitrate. To opt-out, you must notify Inspire Mental Fitness PLLC in
          writing no later than 30 days after first becoming subject to this
          arbitration agreement. Your notice must include your name and mailing
          address, and the email address you used to set up your Inspire Mental
          Fitness PLLC account (if you have one), and an unequivocal statement
          that you want to opt-out of this arbitration agreement. You must send
          your opt-out notice to email address:
          helpdesk@inspirementalfitness.com, ATTN: Arbitration Opt-out, If you
          opt-out of this agreement to arbitrate, the opt-out shall not waive or
          affect any other portion of these Terms.
          <br />
          <br />
          (j) Arbitration Agreement Survival. This arbitration agreement will
          survive the termination of your relationship with Inspire Mental
          Fitness PLLC.
          <br />
          <br />
        </p>
        <h2 className="fs-4 text-secondary fw-bold py-3">15. GENERAL</h2>
        <h2 className="fs-4 fw-bold py-4">15.1 ASSIGNMENT BY US</h2>
        <p>
          Inspire Mental Fitness PLLC may transfer its rights and obligations
          under these Terms to any company, firm or person at any time if it
          does not materially affect your rights under it. You may not transfer
          your rights or obligations under these Terms to anyone else. These
          Terms are personal to you and no third party is entitled to benefit
          under these Terms except as set out here.
        </p>
        <h2 className="fs-4 fw-bold py-4">15.2 INDEMNITY</h2>
        <p>
          To the fullest extent permitted by law, you are responsible for your
          use of the Products and Services, and you will defend and indemnify
          Inspire Mental Fitness PLLC, your employer, your health plan, or
          provider (as applicable) and each of their respective officers,
          directors, employees, consultants, affiliates, subsidiaries and agents
          (together, the “Inspire Mental Fitness PLLC Entities”) from and
          against any claim brought by a third party, and any related liability,
          damage, loss, and expense, including reasonable attorneys’ fees and
          costs, arising out of or connected with: (a) your unauthorized use of,
          or misuse of, the Products or Services; (b) your violation of any
          portion of these Terms, any representation, warranty, or agreement
          referenced in these Terms, or any Applicable Law; (c) your violation
          of any third-party right, including any intellectual property right or
          publicity, confidentiality, other property, or privacy right; or (d)
          any dispute or issue between you and any third party. The foregoing
          indemnification obligation is subject to a Inspire Mental Fitness PLLC
          Entity promptly informing you in writing of any such claim, demand,
          action, or suit; provided that any failure to so inform you will not
          prejudice your obligation of indemnity, except to the extent
          materially prejudiced thereby. We reserve the right, at our own
          expense, to assume the exclusive defense and control of any matter
          otherwise subject to indemnification by you (without limiting your
          indemnification obligations with respect to that matter), and in that
          case, you agree to cooperate with our defense of those claims.
        </p>
        <h2 className="fs-4 fw-bold py-4">15.3 LIMITATION OF LIABILITY</h2>
        <p>
          TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL THE INSPIRE
          MENTAL FITNESS PLLC ENTITIES BE LIABLE TO YOU FOR ANY INDIRECT,
          INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES (INCLUDING
          DAMAGES FOR LOSS OF PROFITS, GOODWILL, OR ANY OTHER INTANGIBLE LOSS)
          ARISING OUT OF OR RELATING TO YOUR ACCESS TO OR USE OF, OR YOUR
          INABILITY TO ACCESS OR USE, THE PRODUCTS AND SERVICES OR ANY MATERIALS
          OR CONTENT ON THE PRODUCTS, WHETHER BASED ON WARRANTY, CONTRACT, TORT
          (INCLUDING NEGLIGENCE), STATUTE, OR ANY OTHER LEGAL THEORY, AND
          WHETHER OR NOT ANY INSPIRE MENTAL FITNESS PLLC ENTITY HAS BEEN
          INFORMED OF THE POSSIBILITY OF DAMAGE. <br />
          <br />
          EXCEPT AS PROVIDED IN THE ARBITRATION CLAUSE AND TO THE FULLEST EXTENT
          PERMITTED BY LAW, THE AGGREGATE LIABILITY OF THE INSPIRE MENTAL
          FITNESS PLLC ENTITIES TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING
          TO THE USE OF OR ANY INABILITY TO USE ANY PORTION OF THE PRODUCTS AND
          SERVICES OR OTHERWISE UNDER THESE TERMS, WHETHER IN CONTRACT, TORT, OR
          OTHERWISE, IS LIMITED TO THE GREATER OF: (A) THE AMOUNT YOU HAVE PAID
          TO INSPIRE MENTAL FITNESS PLLC FOR ACCESS TO AND USE OF THE PRODUCTS
          AND SERVICES IN THE 12 MONTHS PRIOR TO THE EVENT OR CIRCUMSTANCE
          GIVING RISE TO CLAIM; OR (B) $10,000. <br />
          <br />
          EACH PROVISION OF THESE TERMS THAT PROVIDES FOR AN ASSUMPTION OF RISK,
          LIMITATION OF LIABILITY, DISCLAIMER OF WARRANTIES, OR EXCLUSION OF
          DAMAGES IS INTENDED TO AND DOES ALLOCATE THE RISKS BETWEEN THE PARTIES
          UNDER THESE TERMS. THIS ALLOCATION IS AN ESSENTIAL ELEMENT OF THE
          BASIS OF THE BARGAIN BETWEEN THE PARTIES. EACH OF THESE PROVISIONS IS
          SEVERABLE AND INDEPENDENT OF ALL OTHER PROVISIONS OF THESE TERMS. THE
          LIMITATIONS IN THIS SECTION WILL APPLY EVEN IF ANY LIMITED REMEDY
          FAILS OF ITS ESSENTIAL PURPOSE.
        </p>
        <h2 className="fs-4 py-3 fw-bold">15.4 NO WAIVER</h2>
        <p>
          If we delay exercising or fail to exercise or enforce any right
          available to us under these Terms, such delay or failure does not
          constitute a waiver of that right or any other rights under these
          Terms.{" "}
        </p>
        <h2 className="fs-4 py-3 fw-bold">15.5 FORCE MAJEURE</h2>
        <p>
          We will not be liable to you for any lack of performance, or the
          unavailability or failure, of the Products and Services, or for any
          failure or delay by us to comply with these Terms, where such lack,
          unavailability or failure arises from any cause beyond our reasonable
          control.
        </p>
        <h2 className="fs-4 py-3 fw-bold">15.6 NOTICES</h2>
        <p>
          Unless otherwise specifically indicated, all notices given by you to
          us must be given to Inspire Mental Fitness PLLC at
          helpdesk@inspirementalfitness.com. We may give notice to you at the
          e-mail address you provide to us when you register, or in any of the
          ways specified in these Terms. Notice will be deemed received and
          properly served immediately when posted on the Products or when an
          e-mail or other electronic communication is sent. In proving the
          service of any notice via email, it will be sufficient to prove that
          such email was sent to the specified e-mail address of the addressee.
        </p>
        <h2 className="fs-4 py-3 fw-bold">15.7 ENTIRE AGREEMENT</h2>
        <p>
          These Terms and any additional terms or policies expressly referred to
          in these Terms constitute the whole agreement between us and supersede
          all previous oral or written discussions, correspondence,
          negotiations, previous arrangement, understanding or agreement between
          us relating to the Products and Services. We each acknowledge that
          neither of us relies on, or will have any remedies in respect of, any
          representation or warranty (whether made innocently or negligently)
          that is not set out in these Terms or the additional terms or policies
          expressly referred to in these Terms. Each of us agrees that our only
          liability in respect of those representations and warranties that are
          set out in this agreement (whether made innocently or negligently)
          will be for breach of contract. Nothing in this Section limits or
          excludes any liability for fraud.
        </p>
        <h2 className="fs-4 py-3 fw-bold">15.8 THIRD PARTY RIGHTS</h2>
        <p>
          A person who is not party to these Terms will not have any rights
          under or in connection with these Terms, except as described in
          Section 11 (DMCA).
        </p>
        <h2 className="fs-4 py-3 fw-bold">15.9 EXCLUSIVE VENUE</h2>
        <p>
          To the extent the parties are permitted under these Terms to initiate
          litigation in a court, with you and Inspire Mental Fitness PLLC agree
          that all claims and disputes arising out of or relating to the Terms
          or the use of the Products and Services will be litigated exclusively
          in the United States District Court for the Eastern District of New
          York. If, however, that court would lack original jurisdiction over
          the litigation, then all claims and disputes arising out of or
          relating to the Terms or the use of the Products and Services will be
          litigated exclusively in the Superior Court of New York, County of
          Suffolk. You and Inspire Mental Fitness consent to the personal
          jurisdiction of both courts.
        </p>
        <h2 className="fs-4 py-3 fw-bold">15.10 CHOICE OF LAW</h2>
        <p>
          The laws of New York, other than its conflict-of-laws principles,
          govern these Terms and any disputes arising out of or relating to
          these Terms or their subject matter, including tort claims, except to
          the extent they are preempted by U.S. federal law. The United Nations
          Convention on Contracts for the International Sale of Goods will not
          apply.
        </p>
        <h2 className="fs-4 py-3 fw-bold">15.11 SEVERABILITY</h2>
        <p className="pb-4">
          If any provision of these Terms is found unenforceable, then that
          provision will be severed from these Terms and not affect the validity
          and enforceability of any remaining provisions.
          <br />
          <br />
          Inspire Mental Fitness is located at 62 Sejon Drive, Sayville, NY
          11782.
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;
