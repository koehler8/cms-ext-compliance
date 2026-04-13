<template>
  <section class="legal-page section-shell" data-analytics-section="terms">
    <div class="container legal-page__container">
      <article class="legal-card">
        <header class="legal-card__header">
          <h2 class="legal-card__title">{{ headerTitle }}</h2>
          <span class="legal-divider" aria-hidden="true"></span>
          <p class="legal-card__meta">Last modified: {{ lastUpdated }}</p>
        </header>
        <div class="legal-content">
          <template v-if="hasCustomContent">
            <p v-if="customIntro">{{ customIntro }}</p>
            <div
              v-if="customBody"
              class="legal-rich-text"
              v-html="customBody"
            />
            <section
              v-for="(section, index) in customSections"
              :key="section.id || index"
              class="legal-section"
            >
              <h3 v-if="section.title">{{ section.title }}</h3>
              <p v-if="section.summary">{{ section.summary }}</p>
              <div
                v-if="section.body"
                class="legal-rich-text"
                v-html="section.body"
              />
              <p
                v-for="(paragraph, paragraphIndex) in section.paragraphs"
                :key="`paragraph-${paragraphIndex}`"
              >
                {{ paragraph }}
              </p>
              <ul v-if="section.list.length">
                <li
                  v-for="(item, itemIndex) in section.list"
                  :key="`item-${itemIndex}`"
                >
                  {{ item }}
                </li>
              </ul>
            </section>
          </template>
          <template v-else>
          <p>{{siteName}} and/or its affiliates (“we,” “our,” or “us”) provides its software services
                through its website located at {{ siteUrl }} and related mobile applications and products
                (collectively the “Services” or “{{siteName}}”). Before using our Services, please read the Terms of Service (the “Terms”) carefully, along with any other policies or notices on our
                website or mobile applications.</p>

              <p><strong>Agreement To Terms</strong></p>
              <p>
                These Terms of Service (the “Agreement”) explains the terms and conditions by which you
                may access and use ‘{{ siteUrl }}’, the app ‘{{siteName}}’, and any associated
                subdomains (referred to as the "Website").
                This agreement carefully outlines the rules and conditions that apply to your use of the
                website and app. By accessing or using either the Website or App, you indicate that you
                have read, understood, and agreed to be bound by the terms of this Agreement in its
                entirety. If you do not agree with these terms, you are not authorized to access or use any of
                the {{siteName}} Services and should refrain from doing so.
                This Agreement includes essential information that affects your rights, such as a provision
                for binding arbitration and a waiver of class action. These provisions dictate how disputes
                will be resolved. Therefore, you can only access and use the Website and App if you
                completely agree to all the terms outlined in this Agreement.
                WE DO NOT PROVIDE INVESTMENT OR FINANCIAL ADVICE OR CONSULTING
                SERVICES. OUR ROLE IS SOLELY TO PROVIDE '{{siteName}},' AND WE DO NOT
                ADVISE OR MAKE RECOMMENDATIONS ABOUT ENGAGING IN DIGITAL ASSET
                TRANSACTIONS OR OPERATIONS. ANY DECISIONS MADE WHEN PARTICIPATING IN
                TRANSACTIONS OR OPERATIONS INVOLVING DIGITAL ASSETS SHOULD BE BASED
                ON THE USER'S OWN JUDGMENT AND DISCRETION.
              </p>

              <p><strong>Updates to Terms or Services</strong></p>
              <p>
                We reserve the right to modify these Terms at any time at our sole discretion. In the event of
                any changes to the Policy, users will be notified via email In a timely fashion. While our
                intention is to provide advance notice prior to implementing any changes, there may be
                circumstances where immediate changes are necessary and advance notice may not be
                feasible. Revised Terms as posted will take effect immediately, unless otherwise indicated.
              </p>

              <p><strong>Introduction</strong></p>
              <p>
                {{siteName}} (The Application) provides access to a decentralized protocol on various public
                blockchains, including but not limited to Ethereum Chain, BNB, Polygon and SOL, allowing
                users to trade certain compatible digital assets such as “{{siteToken}}” ({{siteName}} native Token),
                among other services. The website is one, but not the exclusive, means of accessing the
                exchange.
                {{siteName}} (The App) is a fully decentralized crypto wallet, which addresses concerns
                present in traditional custody solutions regarding security, privacy, and control over assets.
                The application provides access to a decentralized protocol on various public blockchains,
                including but not limited to Ethereum Chain, BNB, Polygon and SOL. {{siteName}} allows
                users to securely store, send, and receive cryptocurrencies, tokens, and other digital assets
                using either the {{siteName}} App or the {{siteName}} Browser extension.
                We ({{siteName}}) do not possess custody or control over the contents of your wallet and are
                unable to retrieve or transfer its contents. By using any of {{siteName}} Services you
                explicitly agree to be bound by this Agreement, as well as all terms referenced and
                incorporated herein.
              </p>

              <p><strong>Eligibility</strong></p>
              <p>
                To access and us the services provided by {{siteName}}, you must have the capacity to enter
                into a legally binding agreement with us. This requires you to declare that you have attained
                the legal age of majority as defined by the laws of your jurisdiction (e.g., 18 years old in the
                United States) and possess the full right, authority, and power to enter into and comply with
                the terms and conditions specified in this Agreement. Furthermore, to be eligible for these
                terms: (i) you must not be a resident of sanctioned jurisdictions in accordance with trade
                embargoes, UN Security Council Resolutions ("UNSCR"), or HM Treasury's financial
                sanctions regime; and (ii) you must not currently be subject to economic sanctions, such as
                inclusion on the United Nations Security Council Sanctions List, the list of specially
                designated nationals maintained by OFAC, the denied persons or entity list of the U.S.
                Department of Commerce, or any similar list maintained by any other relevant sanctions
                authority.
                If you are utilizing our services on behalf of a legal entity, you additionally affirm and
                guarantee that: (iii) the legal entity has been duly organized and validly exists under the
                applicable laws of its jurisdiction of organization; and (iv) you are duly authorized by such
                legal entity to act on its behalf. Your usage of our services is permitted only if it complies with
                the laws of your jurisdiction. To clarify, you may not employ our services if you are situated
                in, or a citizen or resident of any state, country, territory, or other jurisdiction where such
                usage would be illegal or contravene any applicable laws. It is your responsibility to ensure
                that these terms adhere to all applicable laws, rules, and regulations that are applicable to
                you.
                By utilizing {{siteName}}, you affirm and warrant that you meet all the eligibility requirements
                outlined in these terms. However, we retain the right to deny access or usage of {{siteName}}
                to certain individuals, and we reserve the discretion to modify our eligibility criteria at any
                time.
              </p>

              <p><strong>Services</strong></p>
              <p>
                {{siteName}} is a software application that operates as a non-custodial wallet for various
                digital assets, including cryptocurrencies, virtual commodities, and NFTs ("Digital Assets").
                As a non-custodial wallet, you retain complete control and responsibility for your Digital
                Assets and private keys. This grants you the authority to authorize transactions from your
                wallet address. It is important to acknowledge and agree that {{siteName}}'s non-custodial
                nature places the full responsibility for your actions and the associated risk of loss squarely
                on you.
                {{siteName}} provides the following functionalities:
              </p>
              <p>1. Generation of wallet addresses and their associated private keys, enabling you to
                send and receive digital assets.</p>
              <p>2. Access to third-party decentralized applications ("DApps") and decentralized
                exchanges ("DEX") through the web browser integrated into the mobile application.</p>
              <p>3. Capability to swap or trade digital assets utilizing the DApp functionality offered by
                third-party service providers.</p>
              <p>4. Option to stake specific digital assets within third-party "proof of stake" networks
                through Staking Services.</p>
              <p>5. Access to digital asset price information provided by third-party service providers.</p>
              <p>6. Ability to broadcast Digital Asset Transaction data to various blockchains supported
                by {{siteName}} without the need to download or install the respective
                blockchain-based software on your local device.</p>

              <p><strong>Wallet Address, Private Key, and Backup Capabilities</strong></p>
              <p>
                You have the option to store an encrypted backup of specific information related to your
                wallet on eligible devices. The private key is directly linked to your wallet address and serves
                as the means to authorize the transfer of Digital Assets to and from that particular wallet
                address. It is your sole responsibility to securely retain and safeguard your private key and
                any associated mnemonic phrase or "Secret Phrase" connected to your wallet. Ensuring the
                security of your wallet address, Secret Phrase, and private key access information is of
                utmost importance. It is crucial that you create backups of your private keys, backup
                phrases, or passwords. Failure to do so may result in the loss of control over the Digital
                Assets associated with your wallet.
                Please note that we do not receive or store your wallet password, encrypted private key,
                unencrypted private key, or Secret Phrase linked to your wallet. If you happen to forget your
                original password, we are unable to generate a new one for your wallet. In the event that you
                have not safely stored a backup of any wallet address and its corresponding private key
                pairs within your wallet, you acknowledge and accept that any Digital Assets associated with
                that wallet address will become inaccessible. Therefore, we assume no responsibility or
                liability whatsoever if you are unable to access your wallet for any reason, including but not
                limited to your failure to maintain the security of your wallet address, Secret Phrase, and
                private key information.
              </p>

              <p><strong>Use of DApps and DEX</strong></p>
              <p>
                By accessing or using DApps or DEX, including the Trade/Swap Digital Assets function
                embedded within the Services, you acknowledge and agree to the following terms:
                (i) {{siteName}} assumes no responsibility for your access or use of DApps or DEX and shall
                not be held liable for any issues or disputes arising from your use of DApps or DEX,
                including any transaction disputes.
                (ii) The limits on the amounts you may exchange via DEX per day are subject to the
                requirements set forth by the third-party developed Smart Contracts.
                (iii) Blockchain operations conducted through DApps or DEX are irreversible. Therefore, you
                bear sole responsibility for any consequences resulting from such transactions, including any
                transfer to an incorrect address or issues associated with the node servers you select.
                (iv) When using DApps or DEX, third-party developed Smart Contracts may impose handling
                fees and/or service fees. Any information regarding these fees displayed on {{siteName}} is
                provided for your reference only. {{siteName}} cannot guarantee the accuracy, applicability,
                reliability, integrity, or suitability of this information and shall not be liable for any loss or
                damage caused directly or indirectly by your reliance on such content.
                (v) Currently, {{siteName}} does not charge any service fees or handling fees for the use of
                DApps or DEX. However, {{siteName}} reserves the right to impose such fees at its discretion
                in the future. Any updated fees will apply to transactions occurring after the effective date of
                the fee update.
              </p>

              <p><strong>Use of Staking Services</strong></p>
              <p>
                By accessing or using the Staking Service, you agree to the following terms:
                1. A third party may stake certain Digital Assets on your behalf ("Staked Digital Assets")
                by acting as a transaction validator on the applicable blockchain network.
                2. If a block of transactions is successfully validated using the Staked Digital Assets, a
                reward, known as the "Staking Reward," is granted by that network.
                3. {{siteName}} assumes no responsibility for your use of the Staking Service and shall
                not be held liable for any issues or disputes arising from your use of the Staking
                Service.
                4. {{siteName}} does not guarantee the continuous occurrence of Staking or the staking
                of any particular Digital Asset. {{siteName}} is not responsible for ensuring that Staking
                occurs on a continuous basis or that any specific Digital Asset will be staked or
                continue to be staked.
                Please note that the Staking Service is subject to the terms and conditions of the third party
                providing the service.
              </p>

              <p><strong>Buy Digital Assets with Supported Credit or Debit Cards</strong></p>
              <p>
                If you choose to purchase Digital Assets using your credit or debit card through {{siteName}},
                please note the following:
                1. A third party will handle the conversion of your chosen amount into the applicable
                Digital Asset and credit it to your wallet.
                2. {{siteName}} is not responsible for your use of this third party service and shall not be
                held liable for any issues or disputes arising from your use of the service.
                3. You will be subject to the terms and conditions imposed by the relevant third party
                service provider.
                4. {{siteName}} does not have the ability to change, withdraw, or cancel any conversion
                requests you place through the third party service.
                5. {{siteName}} is not responsible for determining or controlling the exchange rates
                offered by the third party service provider(s).
                6. Any fees charged by the relevant third party service provider(s), as well as any fees
                charged by your bank or credit card issuer(s), are not the responsibility of {{siteName}}.
                Please ensure that you review and agree to the terms and conditions set forth by the third
                party service provider before using their services.
              </p>

              <p><strong>Digital Asset Transactions</strong></p>
              <p>
                To ensure the completion of all proposed Digital Asset transactions, they must be confirmed
                and recorded in the associated public blockchain of the Digital Asset. These blockchains are
                decentralized, peer-to-peer networks supported by independent third parties that we do not
                own, control, or operate. As a result, we have no control over these blockchain networks and
                cannot guarantee the confirmation and processing of any transaction details you submit
                through our Services. By using {{siteName}}, you acknowledge and agree to the following:
                1. We do not have the ability to cancel or modify your transaction.
                2. The transaction details you submit may not be completed or may experience
                significant delays on the applicable blockchain networks.
                3. We do not store, send, or receive Digital Assets.
                4. Any transfer of Digital Assets occurs on the relevant blockchain network, not on a
                network owned by us. Therefore, we do not guarantee the transfer of title or rights in
                any Digital Asset.
              </p>

              <p><strong>Accuracy of Information Provided by User</strong></p>
              <p>You represent and warrant that any information you provide through the Services is accurate
                and complete. You accept and acknowledge that we are not responsible for any errors or
                omissions made by you in connection with any Digital Asset transaction initiated through the
                Services. We strongly recommend that you carefully review your transaction details before
                attempting to transfer a Digital Asset.</p>

              <p><strong>Wallet Registration and Security</strong></p>
              <p>To use {{siteName}}, you must either import or create a wallet. Upon wallet creation, you will
                receive a private key. It is your responsibility to immediately notify us of any unauthorized
                use of your private key or any security breaches related to your wallet. However, you
                acknowledge and agree that you assume all risks associated with using the Services, and
                you are solely responsible for maintaining the confidentiality and security of your private key.
                When creating a wallet, we strongly advise you to take precautions to prevent the loss of
                access to or control over your wallet. These precautions include, but are not limited to:</p>
              <p>● Creating a strong, unique password that is not used for any other purpose and
                utilizing biometric authentication if available.</p>
              <p>● Avoiding storing the private key and Secret Phrase in plain text online or in an
                unsecured physical location.</p>
              <p>● Restricting access to your devices and wallet.</p>
              <p>● Taking necessary measures to protect against malware on your devices and
                networks.</p>
              <p>● Promptly notifying us if you discover or suspect any security breaches related to your
                wallet.</p>
              <p>Regardless of the above, we hold no liability whatsoever for activities that occur on your
                wallet, with or without your authorization.</p>

              <p><strong>Transaction Fees</strong></p>
              <p>
                Virtual currency transactions may be subject to transaction fees, such as mining fees,
                imposed by the virtual currency system or blockchain network you are using. Before initiating
                a transaction, you are responsible for ensuring that you have a sufficient balance in your
                wallet and/or "gas" to cover the transaction fees. You acknowledge and agree that we will
                not be held liable for any failed transactions or losses you experience due to incorrectly set
                transaction fees (either too low or too high) or insufficient funds or gas associated with your
                wallet address. Additionally, we do not have access to your transactions or those of any
                other user.
              </p>

              <p><strong>Taxes</strong></p>
              <p>
                It is your responsibility to determine whether any taxes apply to the transactions you initiate
                through the Services and to report and remit the appropriate tax to the relevant tax authority.
                We are not responsible for determining the applicability of taxes to your transactions or for
                collecting, reporting, withholding, or remitting any taxes associated with Digital Asset-related
                transactions.
              </p>

              <p><strong>Third Party Services And Content</strong></p>
              <p>
                Please note that {{siteName}} does not have any control over or assume liability for various
                aspects of Digital Assets transactions, including the delivery, quality, safety, legality, or any
                other aspect of the assets transferred to or from a third party. {{siteName}} does not
                guarantee the completion of transactions or the authorization of the entities involved. If you
                encounter any issues or problems with a transaction using their services, you bear all
                associated risks and liabilities.
              </p>

              <p><strong>Intellectual Property Rights</strong></p>
              <p>
                {{siteName}} retains exclusive ownership of all intellectual property and other rights
                associated with the Website, App and its contents. This includes, but is not limited to,
                software, text, images, trademarks, service marks, copyrights, patents, designs, and the
                overall "look and feel" of the Website. On the other hand, versions 1-3 of the Protocol are
                constructed entirely from open-source or source-available software that operates on public
                blockchains.
                If you (the user) agrees to and complies with the terms, you are granted a non-exclusive,
                non-sublicensable, and non-transferable license to use {{siteName}} for personal use or
                internal business use only. However, there are certain restrictions and limitations on your use
                of {{siteName}}. Specifically, you are not allowed to reproduce, modify, adapt, or create
                derivative works of {{siteName}}. You cannot rent, lease, distribute, sell, sublicense, transfer,
                or provide access to {{siteName}} to third parties. {{siteName}} should not be used for the
                benefit of any third party without prior consent. You are also prohibited from incorporating
                {{siteName}} into a product or service provided to a third party without obtaining written
                consent from the owner. Any attempts to circumvent usage limitations or reverse engineer
                the software are strictly prohibited, except as expressly permitted by applicable law and with
                advance notice to the owner. Additionally, you should not remove or obscure any proprietary
                or other notices contained in {{siteName}}. Using {{siteName}} for competitive analysis or to
                build competitive products is also not permitted.
              </p>

              <p><strong>Further Rights</strong></p>
              <p>
                We reserve certain rights, which are not considered obligations on our part. These rights
                include the following:
                (a) We have the authority to review, modify, filter, disable, delete, and remove any and all
                content and information from the Website.
                (b) We may, at our discretion and with or without prior notice to you, modify, substitute,
                eliminate, or add to the Website.
                (c) We may cooperate with law enforcement, court orders, government investigations, or
                third-party requests that require or direct us to disclose information or content provided by
                you.
                Please note that while we retain these rights, their exercise does not create an obligation for
                us to act in a specific manner.
              </p>

              <p><strong>Prohibited Activity</strong></p>
              <p>
                You agree not to engage in, or attempt to engage in, any of the following categories of
                prohibited activity in relation to your access and use of the Website:
              </p>

              <p><strong>Basic</strong></p>
              <p>
                1. Unauthorized access: Users must not attempt to gain unauthorized access to the
                website, its systems, or any other user accounts.
                2. Illegal activities: Users must not engage in any activity that is unlawful, fraudulent, or
                promotes illegal behavior.
                3. Intellectual property infringement: Users must not infringe upon the intellectual
                property rights of others, including copyright, trademarks, patents, or trade secrets.
                4. Spam and phishing: Users must not send unsolicited or deceptive communications,
                including spam, phishing attempts, or other fraudulent activities.
                5. Malicious software: Users must not distribute viruses, malware, or any other harmful
                software or code that could damage or disrupt the website or its users.
                6. Harassment and abuse: Users must not engage in any form of harassment, bullying,
                or abusive behavior towards other users, including hate speech, threats, or personal
                attacks.
                7. Impersonation: Users must not impersonate another person, entity, or falsely
                represent their affiliation with a person or organization.
                8. Data mining and scraping: Users must not engage in unauthorized data mining,
                scraping, or harvesting of information from the website or its users.
                9. Violation of privacy: Users must respect the privacy of others and not engage in
                activities that violate the privacy rights of individuals, including the unauthorized
                collection or dissemination of personal information.
                10.Violation of terms: Users must comply with all terms and conditions outlined in the
                website's Terms of Service and not engage in any activity that violates these terms.
              </p>

              <p><strong>Extended Prohibited Activity</strong></p>
              <p>
                1. Intellectual Property Infringement: Users are strictly prohibited from engaging in any
                activity that infringes upon or violates any copyright, trademark, service mark, patent,
                right of publicity, right of privacy, or other proprietary or intellectual property rights
                under the law.
                2. Cyberattack: Users shall not participate in any activity that aims to interfere with or
                compromise the integrity, security, or proper functioning of any computer, server,
                network, personal device, or other information technology system. This includes, but
                is not limited to, the deployment of viruses and denial of service attacks.
                3. Fraud and Misrepresentation: Users are prohibited from engaging in any activity that
                seeks to defraud us or any other person or entity. This includes providing false,
                inaccurate, or misleading information with the intent to unlawfully obtain the property
                of another.
                4. Market Manipulation: Users shall not engage in any activity that violates any
                applicable laws, rules, or regulations concerning the integrity of trading markets. This
                includes, but is not limited to, manipulative tactics such as "rug pulls," pumping and
                dumping, and wash trading.
                5. Securities and Derivatives Violations: Users must not engage in any activity that
                violates any applicable laws, rules, or regulations concerning the trading of securities
                or derivatives. This includes, but is not limited to, the unregistered offering of
                securities and the offering of leveraged and margined commodity products to retail
                customers in the United States.
                6. Sale of Stolen Property: Users shall not engage in the buying, selling, or transferring
                of stolen items, fraudulently obtained items, items taken without authorization, and/or
                any other illegally obtained items.
                7. Data Mining or Scraping: Users are strictly prohibited from engaging in activity that
                involves data mining, robots, scraping, or similar methods of gathering or extracting
                content or information from the Website.
                8. Objectionable Content: Users must refrain from engaging in any activity that involves
                soliciting information from anyone under the age of 18 or that is otherwise harmful,
                threatening, or offensive in nature.
              </p>

              <p><strong>Feedback</strong></p>
              <p>
                From time to time, you may choose to submit feedback to us. We may, in connection with
                {{siteName}}, freely use, copy, disclose, license, distribute and exploit any feedback in any
                manner without any obligation, royalty or restriction based on intellectual property rights or
                otherwise. No feedback will be considered your Confidential Information, and nothing in this
                Agreement limits our right to independently use, develop, evaluate, or market products or
                services, whether incorporating feedback or otherwise.
              </p>

              <p><strong>Content</strong></p>
              <p>
                {{siteName}} may contain copyrighted material and trademarks including, but not limited to,
                text and graphics (the “Content”), which is protected by copyright law, registered and
                unregistered trademarks, and other intellectual property rights. Unless otherwise provided,
                we exclusively own the Content. Your use of {{siteName}} does not grant you any right, title,
                or interest in the Content. You agree that you will not copy, reproduce, modify, republish,
                upload, post, transmit, distribute, collect, sell, license, create derivative works from, or, in any
                other way, whether manual or automated, exploit any of the Content, in whole or in part.
              </p>

              <p><strong>License to NFT Content</strong></p>
              <p>
                You may be able to store non-fungible tokens (“NFTs”) on {{siteName}}. You hereby represent
                and warrant that you own all legal right, title in and interest to, including all intellectual
                property rights to the content associated with the NFT (“NFT Content”), or you are legally
                authorized by the owner of the intellectual property in the NFT Content to store the NFTs on
                {{siteName}}. You retain all rights to the NFT Content stored or {{siteName}} except for rights
                expressly granted herein. By using {{siteName}}, you grant us a license to access, use, host,
                cache, store, copy, reproduce, transmit, display, publish, distribute, adapt and modify (for
                technical purposes, e.g., making sure content is viewable on smartphones as well as
                computers and other devices) the NFT Content in any and all media or distribution methods
                (now know or later developed) solely as required to be able to operate and provide services
                of {{siteName}}. We do not monitor the NFTs and NFT Content stored on {{siteName}} for any
                infringement of a third party’s intellectual property rights. Accordingly, we assume no liability
                for any action regarding any content provided by you. You further acknowledge and agree it
                is your sole responsibility to carry out all necessary due diligence for all your activities
                relating to NFTs, and you represent and warrant that you have not and are not relying on,
                and shall have no remedies, in respect of any statement or representation made by us in
                relation to any transfer or interaction otherwise with any NFTs. If you have a dispute in
                relation to the NFTs and/or NFT Content, YOU RELEASE US FROM CLAIMS, DEMANDS,
                AND DAMAGES OF EVERY KIND AND NATURE, KNOWN AND UNKNOWN, ARISING
                OUT OF OR IN ANY WAY CONNECTED WITH SUCH DISPUTES. IN ENTERING INTO
                THIS RELEASE YOU EXPRESSLY WAIVE ANY PROTECTIONS (WHETHER STATUTORY
                OR OTHERWISE) THAT WOULD OTHERWISE LIMIT THE COVERAGE OF THIS
                RELEASE TO INCLUDE THOSE CLAIMS WHICH YOU MAY
              </p>

              <p><strong>Non-Custodial Nature and Absence of Fiduciary Duties</strong></p>
              <p>
                The Website operates as a non-custodial application, meaning that we never have custody,
                possession, or control over your digital assets at any point in time. It also implies that you
                bear sole responsibility for safeguarding the cryptographic private keys to your digital asset
                wallets. It is crucial that you refrain from sharing your wallet credentials or seed phrase with
                any third party. We hold no responsibility or liability to you concerning your use of a wallet
                and do not provide any representations or warranties regarding the compatibility of the
                Website with any specific wallet. Similarly, any associated wallet is solely your responsibility,
                and we are not liable for any actions or omissions on your part resulting from the
                compromise of your wallet.
                This Agreement does not aim to establish or impose any fiduciary duties upon us. To the
                maximum extent permitted by applicable law, you acknowledge and agree that we have no
                fiduciary duties or liabilities towards you or any other party. Any fiduciary duties or liabilities
                that may exist by law or equity are hereby unequivocally disclaimed, waived, and eliminated.
                Furthermore, you agree that the only duties and obligations we owe you are those expressly
                stated in this Agreement.
              </p>

              <p><strong>Jurisdictional Compliance and Tax Obligations</strong></p>
              <p>
                The availability and suitability of the Website may be subject to jurisdictional limitations. By
                accessing or using the Website, you explicitly acknowledge and agree that you bear
                complete and exclusive responsibility for ensuring strict compliance with all applicable laws
                and regulations that may pertain to your use of the Website.
                It is important to note that your utilization of the Website or the Protocol may give rise to
                various tax implications, including but not limited to income tax, capital gains tax,
                value-added tax (VAT), goods and services tax (GST), or sales tax, as dictated by the
                relevant jurisdictions. It is your sole obligation to diligently assess whether such taxes apply
                to any transactions you engage in or receive through the Website, and if determined
                applicable, to accurately report and remit the requisite taxes to the appropriate tax authority
                within the prescribed timeframes, ensuring full compliance with all applicable tax laws and
                regulations.
              </p>

              <p><strong>LIMITATION OF LIABILITY & DISCLAIMER OF WARRANTIES</strong></p>
              <p>
                By using the Services provided by {{siteName}}, you acknowledge and agree to the following:
                1. Limitation of Liability: {{siteName}} and its affiliates, shareholders, members, directors,
                officers, employees, attorneys, agents, representatives, suppliers, and contractors
                shall not be liable for any direct damages or incidental, indirect, special, punitive,
                consequential, or similar damages or liabilities arising from your access or use of the
                Services. This includes, but is not limited to, damages for loss of data, information,
                revenue, profits, or other businesses or financial benefits, regardless of the legal
                theory under which such damages may arise.
                You specifically release {{siteName}} from any liability related to losses, damages, or claims
                arising from the following: (a) User error, such as forgotten passwords, incorrectly
                constructed transactions, or mistyped Digital Asset addresses. (b) Server failure or data loss.
                (c) Unauthorized access to the {{siteName}} application. (d) Bugs or other errors in the {{siteName}}
                software. (e) Any unauthorized third-party activities, including the use of viruses,
                phishing, brute forcing, or other means of attack against {{siteName}}.
                2. Disclaimer of Warranties: {{siteName}} is provided on an "as is" and "as available"
                basis, without any warranties or representations of any kind. {{siteName}} disclaims all
                representations and warranties, express or implied, relating to the Services and
                underlying software, including but not limited to warranties of merchantability, fitness
                for a particular purpose, title, non-infringement, freedom from computer virus, and
                any implied warranties arising from course of dealing, course of performance, or
                usage in trade.
                {{siteName}} does not guarantee that the content accessible via the Services is accurate,
                complete, available, current, free of viruses or other harmful components, or that the results
                of using the Services will meet your requirements. {{siteName}} does not make any
                representations or warranties regarding the continuous, uninterrupted, timely, or error-free
                access to {{siteName}} or the functionality of the Services.
                By using the Services, you acknowledge that you have read and understood these
                limitations of liability and disclaimer of warranties and agree to be bound by them.
              </p>

              <p><strong>INDEMNITY</strong></p>
              <p>
                You agree to defend, indemnify, and hold harmless {{siteName}}, its affiliates, and their
                respective shareholders, members, directors, officers, employees, attorneys, agents,
                representatives, suppliers, and contractors, to the extent permitted by applicable law, from
                and against any and all claims, damages, obligations, losses, liabilities, torts, costs or debt,
                and expenses (including but not limited to attorney's fees) arising from:
                (a) Your use of and access to the Services provided by {{siteName}}. (b) Any feedback or
                submissions you provide to {{siteName}}. (c) Violation of any Third Party Content. (d) Your
                violation of the Terms. (e) Your violation of any law, rule, or regulation, or the rights of any
                third party.
              </p>
              <p><strong>TIME LIMITATION ON CLAIMS</strong></p>
              <p>
                You acknowledge and agree that any claim arising out of or related to your relationship with
                {{siteName}} must be filed within one year after the claim arises. Failure to file such a claim
                within the specified time period will result in the permanent bar of your claim.
              </p>

              <p><strong>Governing Law</strong></p>
              <p>
                The interpretation and enforcement of these Terms, and any Dispute related to these Terms
                or the Services, will be governed by and construed and enforced under the laws of Cayman Islands,
                as applicable, without regard to conflict of law rules or principles (In any state of Cayman Islands or
                other jurisdiction) that would cause the application of the laws of any other jurisdiction. You
                agree that we may initiate a proceeding related to the enforcement or validity of our
                intellectual property rights in any court having jurisdiction. For any other proceeding that is
                not subject to arbitration under these Terms, the state and federal courts located in Cayman Islands
                will have exclusive jurisdiction. You waive any objection to change the venue in any such
                courts.
              </p>

              <p><strong>TERMINATION</strong></p>
              <p>
                In the event of termination regarding your license to use {{siteName}}, your obligations under
                this Agreement will still continue. Your access to the funds in your Wallet after termination
                will depend on your access to your backup of your Wallet address and private key.
              </p>

              <p><strong>DISCONTINUANCE OF SERVICES</strong></p>
              <p>
                We may, in our sole discretion and without cost to you, with or without prior notice, and at
                any time, modify or discontinue, temporarily or permanently, any portion of our Services. You
                are solely responsible for storing outside of the Services a backup of any wallet address and
                private key pair that you maintain in your wallet. Maintaining an external backup of any wallet
                address and private key pairs associated with your wallet will allow you to access the
                blockchain network upon which your wallet is secured. Such a backup will allow you to fully
                restore your wallet at any time without cost or loss of your Digital Assets. If you do not
                maintain a backup of your wallet data outside of the Services, you will not be able to access
                the Digital Assets associated with your wallet. {{siteName}} shall not be held responsible or
                liable for any loss of Digital Assets in the event that we discontinue all or any part of the
                Services.
              </p>

              <p><strong>NO WAIVER</strong></p>
              <p>
                Our failure to exercise or delay in exercising any right, power, or privilege under this
                Agreement shall not operate as a waiver; nor shall any single or partial exercise of any right,
                power, or privilege preclude any other or further exercise thereof. The waiver of any such
                right or provision will be effective only if in writing and signed by a duly authorized
                representative of us. Except as expressly set forth in this Agreement, the exercise by either
                party of any of its remedies under this Agreement will be without prejudice to its other
                remedies under this Agreement or otherwise.
              </p>

              <p><strong>SEVERABILITY</strong></p>
              <p>
              If it turns out that any part of this Agreement is invalid, void, or for any reason unenforceable,
                that term will be deemed severable and limited or eliminated to the minimum extent
                necessary. The limitation or elimination of the term shall not affect or impair the validity or
                enforceability of any remaining part of that term, clause, or provision or any other terms,
                clauses, or provisions of these Terms.
              </p>
              <p><strong>Dispute Resolution and Arbitration</strong></p>
              <p>PLEASE READ THE FOLLOWING SECTION CAREFULLY BECAUSE IT MAY
                SIGNIFICANTLY IMPACT YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT TO BRING A
                LAWSUIT AGAINST {{siteName}} IN ANY COURT OR GOVERNING AUTHORITY.
                EXCEPT AS EXPRESSLY PROVIDED BELOW THIS SECTION REQUIRES YOU TO
                SUBMIT ANY DISPUTE, CLAIM, OR DISAGREEMENT (EACH A “DISPUTE”) ARISING
                OUT OF THESE TERMS OR THE SERVICES, INCLUDING ANY DISPUTE THAT AROSE
                BEFORE THE EFFECTIVE DATES OF THESE TERMS, TO BINDING INDIVIDUAL
                ARBITRATION. THIS SECTION EXTENDS TO DISPUTE THAT AROSE OR INVOLVE
                FACTS OCCURRING BEFORE THE EXISTENCE OF THIS OR ANY PRIOR VERSIONS
                OF THE TERMS AS WELL AS DISPUTES THAT MAY ARISE AFTER THE TERMINATION
                OF THE TERMS.
                We will use our best efforts to resolve any potential disputes through informa, good faith
                negotiations. If a potential dispute arises, you must contact us by sending an email to
                {{ supportEmail }} so that we can attempt to resolve it without resorting to formal
                dispute resolution. If we are not able to reach an informal resolution within sixty days of our
                response to your email, we both agree to resolve the potential dispute according to the
                process set forth below.
                Any claim or controversy arising from the Website, this Agreement, or any other acts or
                omissions that you believe make us liable (referred to as a "Dispute") will be resolved
                through arbitration under the Arbitration Rules of the Cayman Islands International Arbitration
                Centre. You acknowledge that you are required to settle all Disputes through binding
                arbitration. The arbitration will be confidential and conducted before a single arbitrator
                chosen in accordance with the Centre's rules. Unless mutually agreed otherwise, the
                arbitration will take place in Cayman Islands. The arbitrator is not allowed to consolidate your claims
                with those of any other party, unless we agree otherwise. The resulting award can be
                entered as a judgment in any court with jurisdiction.
              </p>
              <p><strong>Class Action and Jury Trial Waiver</strong></p>
              <p>You must bring any and all Disputes against us in your individual capacity and not as part of
                a class action, collective action, private attorney general action, or any other representative
                proceeding. This applies to class arbitration as well. Both you and we agree to waive the
                right to a trial by jury.
              </p>
              <p><strong>Entire Agreement</strong></p>
              <p>These terms represent the entire agreement between you and us regarding the subject
                matter discussed. They supersede any prior written or oral agreements, communications, or
                understandings relating to the subject matter.
              </p>
              <p><strong>General information</strong></p>
              <p>Please refer to our privacy and cookies policy, which is incorporated herein by reference and
                available on the Website for information on how we collect, use, sharee and otherwise
                process information about you.
                You agree to receive all communications, agreements, documents, receipts, notices, and
                disclosures electronically in connection with these Terms or any Services. We may provide
                these communications by posting them on the Site, emailing them to the email address you
                provide, or sending them via Telegram to the username you provide.
                If any provision of these Terms is found to be invalid or unenforceable, it will not affect the
                validity or enforceability of the other provisions, which will remain in full force and effect.
                We will not be responsible or liable for any failure or delay in performing any other services
                or for any loss or damage you may incur due to circumstances or events beyond our control.
                This includes events like floods, extreme weather conditions, earthquakes, acts of God, fires,
                wars, insurrections, riots, labor disputes, accidents, government actions, communication
                failures, power outages, or equipment or software malfunctions.
                Unless otherwise provided or required by the context, the headings of sections are for
                convenience only and will not limit or interpret the sections. Whenever the words "include,"
                "includes," or "including" are used in these Terms, they are deemed to be followed by the
                words "without limitation." The use of "or" is not intended to be exclusive.
                These Terms constitute the entire agreement between you and {{siteName}}, superseding any
                prior or contemporaneous understandings between the parties regarding the Services.
                In case of any conflict between these Terms and any other agreement you may have with us,
                these Terms will prevail unless the other agreement specifically identifies these Terms and
                states that it supersedes them.
                You agree that, except as expressly provided in this Agreement, there are no third-party
                beneficiaries to the Agreement other than the Indemnified Parties
              </p>
              <p><strong>QUESTIONS OR COMMENTS</strong></p>
                <p>If you have any questions relating to these Terms, your rights and obligations arising from
                these Terms, and/or your use of {{siteName}} and our Services, or any other matter, please
                send us a message on our contact page at: {{ supportEmail }}</p>
          </template>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
  import { computed, inject, ref } from 'vue';

  const props = defineProps({
    content: {
      type: Object,
      default: null,
    },
    configKey: {
      type: String,
      default: null,
    },
  });

  const injectedSiteData = inject('siteData', ref({}));

  const siteName = computed(() => injectedSiteData.value?.site?.title || '');
  const siteUrl = computed(() => injectedSiteData.value?.site?.url || '');
  const supportEmail = computed(() => injectedSiteData.value?.site?.supportEmail || '');
  const siteToken = computed(() => (injectedSiteData.value?.site?.title || '').toUpperCase());
  const customContent = computed(() =>
    props.content && typeof props.content === 'object' ? props.content : null,
  );

  const headerTitle = computed(() => {
    if (customContent.value?.title) {
      return customContent.value.title;
    }
    if (siteName.value) {
      return `${siteName.value} - Terms of Service`;
    }
    return 'Terms of Service';
  });

  const lastUpdated = computed(() => customContent.value?.lastUpdated || 'August 2025');
  const customIntro = computed(() =>
    typeof customContent.value?.intro === 'string' ? customContent.value.intro : '',
  );
  const customBody = computed(() =>
    typeof customContent.value?.body === 'string' ? customContent.value.body : '',
  );

  function normalizeSectionItems(sections) {
    if (!Array.isArray(sections)) return [];
    return sections
      .map((section, index) => {
        if (!section || typeof section !== 'object') return null;
        const paragraphs = Array.isArray(section.paragraphs)
          ? section.paragraphs.filter((text) => typeof text === 'string' && text.trim().length)
          : [];
        const list = Array.isArray(section.list)
          ? section.list.filter((text) => typeof text === 'string' && text.trim().length)
          : [];
        const summary = typeof section.summary === 'string' ? section.summary : null;
        const body = typeof section.body === 'string' ? section.body : null;
        const html = typeof section.html === 'string' ? section.html : null;
        const title = typeof section.title === 'string' ? section.title : '';
        if (!title && !summary && !body && !html && !paragraphs.length && !list.length) {
          return null;
        }
        return {
          id: section.id || title || `section-${index}`,
          title,
          summary,
          body: body || html,
          paragraphs,
          list,
        };
      })
      .filter(Boolean);
  }

  const customSections = computed(() => normalizeSectionItems(customContent.value?.sections));
  const hasCustomContent = computed(
    () => Boolean(customIntro.value || customBody.value || customSections.value.length),
  );
</script>



<style scoped>
.legal-page {
  background: var(
    --legal-page-bg,
    color-mix(in srgb, var(--brand-bg-900, #04050a) 90%, #020207 10%)
  );
}

.legal-page__container {
  max-width: 920px;
  margin: 0 auto;
}

.legal-card {
  --legal-card-color: var(
    --legal-card-text,
    var(--brand-card-text, var(--ui-text-primary, #1f2a44))
  );
  --legal-card-color-muted: color-mix(in srgb, var(--legal-card-color) 70%, transparent);
  --legal-card-color-subtle: color-mix(in srgb, var(--legal-card-color) 55%, transparent);
  background: var(--legal-card-bg, var(--brand-surface-card-bg, #ffffff));
  color: var(--legal-card-color);
  border-radius: var(--brand-card-radius, 28px);
  border: 1px solid
    color-mix(in srgb, var(--brand-surface-card-border, rgba(78, 105, 155, 0.35)) 80%, transparent);
  box-shadow: var(--legal-card-shadow, 0 35px 70px rgba(4, 6, 15, 0.35));
  padding: clamp(28px, 6vw, 56px);
}

.legal-card__header {
  text-align: center;
  margin-bottom: clamp(20px, 4vw, 36px);
}

.legal-card__title {
  margin: 0;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--legal-card-color, currentColor);
}

.legal-card__meta {
  margin: 14px 0 0;
  font-size: 0.78rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(
    --legal-card-meta-color,
    var(--legal-card-color-subtle, color-mix(in srgb, var(--ui-text-muted, rgba(31, 42, 68, 0.7)) 90%, transparent))
  );
}

.legal-divider {
  display: block;
  width: 72px;
  height: 2px;
  margin: 18px auto 0;
  background: var(
    --legal-divider-color,
    color-mix(in srgb, var(--brand-border-highlight, rgba(79, 108, 240, 0.6)) 90%, transparent)
  );
  border-radius: 999px;
}

.legal-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  line-height: 1.7;
  color: inherit;
}

.legal-content p {
  margin: 0;
}

.legal-content strong {
  color: var(--legal-strong-color, var(--legal-card-color));
}

.legal-content ul {
  margin: 0;
  padding-left: 1.2rem;
  line-height: 1.6;
}

.legal-content li + li {
  margin-top: 0.35rem;
}
</style>
