# Pulse Merchant Analytics: PRD

## 1\. TL;DR

We will build a per-brand analytics page for merchants who fund Pulse cashback campaigns: what their campaigns drove, what they cost, what came back through refunds, and why some transactions earned nothing. Every figure is already recorded by the cashback engine as ERD-1/2 define it; nothing is promised that the engine cannot supply. Success is merchants understanding how the campaign drove sales and zero ambiguity between bank and merchant. A high-fidelity prototype exists and is validated against the engine contract and the market; this PRD locks the scope so ERD-3 (reporting) can be written against it.

## 2\. Situation

Pulse sends merchant-funded campaigns to banks; the cashback logic will match settled transactions, accrue cashback into an append-only ledger, and record every rejection with its reason. Merchants today get an invoice and nothing else.

## 3\. Problem

The merchant marketing manager at a brand running Pulse campaigns cannot see what a live campaign is doing. They cannot answer their CFO ("what did AED 20,000 of cashback buy us?"), cannot pace budget against days remaining, and cannot answer a customer who says "I didn't get my cashback": that dispute becomes a Lune ops ticket, and the engine team has already flagged that the rejection-triage queue has no owner (ERD-1 Q-6). The engine records every decision precisely so these questions are answerable (ERD-2 G-3, D-9: "rejections are the support ticket"); without this page, that data serves nobody. Evidence today is structural rather than volumetric; dispute and usage volumes get measured at pilot, and every comparable platform (Amex, Cardlytics, Kard, Upside) treats merchant reporting as table stakes.

## 4\. Future press release

"Adidas sees every dirham its cashback drives." Lune Pulse merchants now get a live per-brand dashboard: campaign ROI, budget pacing with days left, the exact reasons near-miss transactions did not earn, and a cashback ledger that reconciles. "For the first time we can see what a campaign does the morning after, and when a customer asks where their cashback is, we answer in one lookup instead of a support ticket."

## 5\. Goals and success metrics

1. Merchant engagement: during a live campaign, the merchant account views the page in at least 3 of every 4 weeks  
2. Reconciliation defects: zero cases where a figure on the page disagrees with the ledger, from pilot day one, checked continuously.  
3. Dispute deflection: at pilot \+ 60 days, at least 80% of merchant cashback disputes are resolved from the page without a Lune ops ticket (measured against the unresolved-refunds and support queues).

## 6\. Non-goals and anti-goals

* No real-time view: the engine is a nightly batch and the page says so. We will not trade ledger correctness for freshness.  
* No metrics the contract cannot defend: no demographics, no customer PII  
* No new-vs-returning or lapsed segments in V1 (they need program history that will not exist); no billing/invoice view (parked for ERD-3); no bank-facing surface (separate product); no campaign creation or editing from this page.  
* Anti-goal: never show the merchant's own targeting (outlets, terminals, dates) as a failure.

## 7\. Constraints and principles

Data is bounded by ERD-1/2: settled feed, rewarded-basis reporting, ledger vocabulary (accrued, reversed, balance, payable, on hold; "paid" does not exist), a fixed set of reasons a transaction can earn nothing (we cannot invent new ones), audience snapshot as the only reach figure, end dates always present (SAMA/CBUAE) with budget as the earlier terminator. 

Platform: web, per-brand account, tenant currency. 

Design: Lune DS, plain English. 

Tradeoff rules the team may use without asking:   
(1) every number must survive an analyst adding it up: when a metric cannot cross-foot (a method to verify that the sum of a set of row totals equals the sum of a set of column totals in a data table or spreadsheet), cut it rather than approximate it.   
(2) the rejection panel lists only reasons the merchant can act on: each must map to a campaign setting they control;


## 8\. Proposed approach (directional)

One page per brand, nine moving pieces: KPI band (GMV, redemptions, ROI attributed, cashback cost net, customers, avg transaction); campaign multi-select filter scoping the cards, chart and table; single-axis performance chart with a metric toggle (GMV and Transactions); Campaigns table (bank partner 1:1, days left, Ending soon at 7 days or fewer, budget pacing) with per-campaign drill-down; rejection panel (four lever reasons) plus a data-quality group; cashback ledger strip (balance, payable now, on hold: position, not flow); customer-count engagement funnel; outlets and channel comparison. 

Working prototype, validated against the engine contract and market comparables: [https://dennisjed-lune.github.io/merchant-analytics/](https://dennisjed-lune.github.io/merchant-analytics/) with the design handoff. Craft and layout are the designer's per Process 02\.

## 9\. User stories and acceptance criteria

Each story is tagged: story id | priority (Must \= V1 does not ship without it, Should \= expected but cuttable, Could \= first to drop). Milestone tags get added when the Linear project exists.

**US-01 | Must:**   
As a merchant marketing manager, I want a KPI band for the reporting period, so that I answer "how are my campaigns doing" in seconds.

* Given a brand with campaign activity, when the page loads, then GMV, Redemptions, Campaign ROI (attributed), Cashback Cost (with accrued and reversed in the subtitle), Customers and Avg Transaction Value render and GMV divided by accrued equals the ROI shown.  
* Given rejected attempts exist, then they are excluded from GMV/Redemptions/ROI and their count appears in the Redemptions subtitle.  
* States: no activity yet (zeroed with explanation), first period (no vs-previous delta shown).   
* Out of scope: any real-time refresh.

**US-02 | Must:**  
As a merchant, I want a Campaigns table with days left and budget pacing, so that I know where to act this week.

* Given an active campaign, when the table renders, then the row shows bank partner, days left ("N days left"), GMV, redemptions, ROI, cashback and budget used (lifetime, never filtered).  
* Given 7 or fewer days left, then the status pill reads "Ending soon"; given a completed campaign, the row reads "ended N days ago"; raw end dates never render in the list.  
* Given a campaign whose budget exhausts before its end date, then it moves to Completed.   
* Out of scope: campaign editing.

**US-03 | Must:**  
As a merchant, I want to open a campaign row into its own metrics, so that I can judge a single campaign.

* Given a row is opened, then redemptions (with share of attempts), rejected count, cashback accrued (period), payable / on hold (as of the latest run), and avg transaction render for that campaign and reconcile to the table row.  
* Given a completed campaign, then hold shows zero and the copy says the refund window is closed.

**US-04 | Must:**  
As a merchant, I want to see why transactions from my activated customers did not earn, so that I can fix settings instead of raising tickets.

* Given rejections exist, then the panel lists only reasons the merchant can act on \- each one maps to a campaign setting they control: minimum spend, per-customer cap, card ranges, budget.  
* States: zero rejections (positive empty state).

**US-05 | Must**  
As a merchant finance user, I want the cashback ledger position, so that I can reconcile my invoice.

* Given the ledger, then Balance, Payable Now and On Hold render as of the latest nightly run, with accrued and reversed in the Balance subtitle, and accrued minus reversed equals balance equals payable plus on hold.  
* Given any filter state on the page, then these figures do not change, and the section says it is a position as of the latest run.

**US-06 | Should**  
As a merchant, I want to filter the cards, chart and table to selected campaigns, so that I can isolate what I am reviewing.

* Given the multi-select ("Campaigns: All" by default), when N campaigns are selected, then the KPI band and table cover exactly those campaigns, the label reads "Campaigns: N of M", the cards note the selection, and aggregates equal the sum of the selected rows.  
* Given everything is unchecked, then the filter resets to All. Funnel, ledger, insights, outlets and channel are unaffected.

**US-07 | Should**  
As a merchant, I want the engagement funnel in unique customers, so that I see where the journey breaks.

* Given the funnel, then Audience Reached (snapshot at go-live), Viewed, Activated, Transacted, Rewarded render with each bar as a share of the previous stage

**US-08 | Should**   
As a merchant, I want outlet and channel performance, so that I see where spend happens.

* Given outlets, then GMV, transactions, Average Order Value and customers render per outlet (with terminal ids listed); outlet GMV sums to total GMV; channel splits (in-store vs online) sum likewise; a null channel is tolerated and excluded from the split.

**US-09 | Could:**  
As a merchant, I want customer value bands and purchase frequency, so that I can set minimum spend and caps from evidence.

* Given the period's transactions, then value-band customers and GMV sum to the page totals, and repeat purchase rate equals customers with 2 or more purchases over all transacting customers.

**US-10 | Could:**  
As a merchant support user, I want to look up a rejected transaction by what the customer can tell me, so that I can answer "where is my cashback?" in one lookup instead of a ticket.

* Given a dispute (date, approximate amount, card last 4, outlet), when I search the rejected attempts, then matching rows show time, outlet, masked card, amount, campaign and the failing gate, newest first.  
* Given a row is opened, then a plain-English verdict states the gate comparison in the customer's terms (e.g. "the AED 96 basket was below the campaign's AED 200 minimum spend") plus a suggested customer-facing explanation;   
* Given no match, then the empty state explains that settled transactions can take up to two days to appear and that transactions that earned cashback are not listed here.  
* The lookup is per-transaction search only, never a browsable per-customer history: customer ids are pseudonymous, and profiling is outside the data contract.   
* Out of scope: dispute status workflow; contacting the customer; transactions that never reached the engine.


## 10\. Risks, rabbit holes, open questions

* Clamped-award wording (ERD-2 Q-1) and customer-notification surfacing (Q-3) are open with owners; decision-log retention (13 months proposed) bounds lookback.  
* Cold start: several modules are honest but thin in week one; empty states are design work, not an afterthought.  
* Rabbit hole named and closed: no per-metric customization, no export builder, no comparisons between periods in V1.

