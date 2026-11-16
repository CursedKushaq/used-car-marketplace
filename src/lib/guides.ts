export interface GuideItem {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  content: string;
}

export const GUIDES: GuideItem[] = [
  {
    slug: "rc-transfer-guide-india",
    title: "How to Transfer RC Ownership in India (Form 29 & 30)",
    excerpt:
      "Complete guide to transferring vehicle Registration Certificate (RC) online through the Parivahan portal. Document checklist, state RTO fees, and buyer/seller liability transfer.",
    readTime: "7 min read",
    category: "Legal & Paperwork",
    content: `
### What is Vehicle RC Transfer?
When a motor vehicle is sold in India, legal ownership does not change when keys or money are exchanged. Ownership legally transfers only when the respective Regional Transport Office (RTO) updates its records under Section 50 of the Motor Vehicles Act, 1988.

### Mandatory Documents Needed:
1. **Form 29 (Notice of Transfer):** Signed by the seller in duplicate. Notifies the RTO that the car has been handed over.
2. **Form 30 (Application for Intimation & Transfer):** Signed by both seller and buyer. Confirms the buyer's intention to register the vehicle in their name.
3. **Original Registration Certificate (RC):** The original smart card or laminated booklet.
4. **Valid Insurance Certificate:** Active policy transferred to the buyer's name or endorsed.
5. **Pollution Under Control (PUC) Certificate:** Must be currently valid.
6. **Buyer's Address Proof & PAN:** Aadhaar card, Passport, or Electricity bill.
7. **Form 28 (NOC):** Required ONLY if transferring between different RTO jurisdictions or states.

### Step-by-Step Online Process on Parivahan Sewa:
1. Visit parivahan.gov.in and navigate to Online Services > Vehicle Related Services.
2. Enter the vehicle registration number and state RTO.
3. Select Transfer of Ownership (TO).
4. Enter chassis number and authenticate via Aadhaar-linked mobile OTP.
5. Pay the statutory transfer fee (varies between ₹300 and ₹1,500 depending on the state).
6. Download the fee receipt and pre-filled Form 29/30.
7. Submit physical copies and original RC at the local RTO or upload via contactless faceless services where enabled.
    `,
  },
  {
    slug: "hypothecation-removal-guide",
    title: "Hypothecation (HP) Removal & Form 35 Guide",
    excerpt:
      "How to remove bank loan endorsement from your vehicle RC after loan foreclosure. Obtaining bank NOC and updating Parivahan records.",
    readTime: "5 min read",
    category: "Banking & NOC",
    content: `
### What is Vehicle Hypothecation?
When you purchase a vehicle on loan, the lending institution (bank or NBFC) endorses their lien on the Registration Certificate (RC). Until this endorsement is removed, you cannot legally sell the car to another party or transfer the title.

### Step 1: Obtain Bank NOC & Form 35
Upon repaying your final EMI or foreclosing your loan:
- Request a Loan Foreclosure Certificate / No Objection Certificate (NOC) from your bank.
- Ensure the bank provides two signed copies of Form 35 (Notice of Termination of an Agreement of Hypothecation) with bank seals.
- *Note:* Bank NOCs typically have a validity period of 90 days. Initiate RTO HP termination before expiry.

### Step 2: Apply for HP Termination on Parivahan
1. Go to the Parivahan portal and choose Hypothecation Termination (HPT).
2. Enter the bank NOC dispatch number and date.
3. Pay the government fee (typically ₹100 - ₹300 depending on state).
4. Book an RTO slot or opt for postal dispatch. A fresh Smart Card RC with a clean, unencumbered title will be issued.
    `,
  },
  {
    slug: "used-car-inspection-checklist",
    title: "10-Point Pre-Purchase Physical Inspection Checklist",
    excerpt:
      "A practical guide to inspecting a used car in daylight: detecting chassis damage, odometer tampering, fluid leaks, and repaint thickness.",
    readTime: "8 min read",
    category: "Inspection & Technical",
    content: `
### 10 Critical Checks Before Handing Over Money

1. **Apron & Chassis Structural Geometry:** Open the engine bay. Inspect the left and right structural aprons where suspension towers bolt. Wrinkled steel, fresh uneven sealant, or mismatched welding indicates a major head-on collision.
2. **Body Panel Gap Consistency:** Measure the gaps around the bonnet, boot lid, and doors. Uneven gaps signify replaced panels.
3. **Engine Oil & Radiator Coolant:** Pull the oil dipstick. Milky or frothy oil suggests a blown cylinder head gasket where coolant is mixing with engine oil.
4. **Tyre Tread & Age Code:** Check the 4-digit DOT date stamped on tyre sidewalls (e.g. "2422" means 24th week of 2022). Uneven tyre edge wear hints at misaligned suspension or accident damage.
5. **Exhaust Smoke Analysis:**
   - Blue smoke: Engine burning oil; worn piston rings.
   - Black smoke: Incomplete fuel combustion; clogged injectors or EGR.
   - White thick smoke: Coolant leakage in combustion chambers.
6. **Air Conditioning Cabin Chill:** The AC should pull cabin temperature down to under 8°C within 5 minutes of idling.
7. **Braking Judder & ABS Test:** On an empty road, brake firmly from 60 km/h. The steering wheel should not vibrate and the car should stop straight without pulling sideways.
8. **Underbody Rust & Flood Signs:** Look under the carpet near pedal boxes and spare wheel well. Silt deposits or musty damp odor indicate flood immersion.
9. **Clutch Bite Point:** In manual cars, if the clutch only engages at the very top of travel or revs slip under acceleration, clutch plate replacement is imminent.
10. **Parivahan App Cross-Check:** Download the official mParivahan app. Enter the plate number to verify chassis number, engine number, and check for active e-challans.
    `,
  },
];
