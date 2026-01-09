# Google Tag Manager (GTM) Setup Instructions

This document provides step-by-step instructions for configuring Google Tag Manager to work with the GA4 analytics implementation in the Security Checklist application.

## Prerequisites

- Access to Google Tag Manager container: `GTM-NJ7W8HQ8`
- Access to Google Analytics 4 property with measurement ID: `G-517LEH65ZW`
- Admin or Editor permissions in GTM

---

## Step 1: Create Data Layer Variables

Navigate to **Variables** > **User-Defined Variables** > **New** and create the following Data Layer Variables:

### 1.1 `dlv - item_id`
| Field | Value |
|-------|-------|
| Variable Type | Data Layer Variable |
| Data Layer Variable Name | `item_id` |
| Data Layer Version | Version 2 |

### 1.2 `dlv - section_id`
| Field | Value |
|-------|-------|
| Variable Type | Data Layer Variable |
| Data Layer Variable Name | `section_id` |
| Data Layer Version | Version 2 |

### 1.3 `dlv - section_title`
| Field | Value |
|-------|-------|
| Variable Type | Data Layer Variable |
| Data Layer Variable Name | `section_title` |
| Data Layer Version | Version 2 |

### 1.4 `dlv - item_title`
| Field | Value |
|-------|-------|
| Variable Type | Data Layer Variable |
| Data Layer Variable Name | `item_title` |
| Data Layer Version | Version 2 |

### 1.5 `dlv - checked`
| Field | Value |
|-------|-------|
| Variable Type | Data Layer Variable |
| Data Layer Variable Name | `checked` |
| Data Layer Version | Version 2 |

### 1.6 `dlv - percentage`
| Field | Value |
|-------|-------|
| Variable Type | Data Layer Variable |
| Data Layer Variable Name | `percentage` |
| Data Layer Version | Version 2 |

### 1.7 `dlv - item_count`
| Field | Value |
|-------|-------|
| Variable Type | Data Layer Variable |
| Data Layer Variable Name | `item_count` |
| Data Layer Version | Version 2 |

### 1.8 `dlv - theme`
| Field | Value |
|-------|-------|
| Variable Type | Data Layer Variable |
| Data Layer Variable Name | `theme` |
| Data Layer Version | Version 2 |

---

## Step 2: Create Custom Event Triggers

Navigate to **Triggers** > **New** and create the following Custom Event triggers:

### 2.1 `CE - checkbox_toggle`
| Field | Value |
|-------|-------|
| Trigger Type | Custom Event |
| Event name | `checkbox_toggle` |
| This trigger fires on | All Custom Events |

### 2.2 `CE - section_complete`
| Field | Value |
|-------|-------|
| Trigger Type | Custom Event |
| Event name | `section_complete` |
| This trigger fires on | All Custom Events |

### 2.3 `CE - progress_milestone`
| Field | Value |
|-------|-------|
| Trigger Type | Custom Event |
| Event name | `progress_milestone` |
| This trigger fires on | All Custom Events |

### 2.4 `CE - theme_change`
| Field | Value |
|-------|-------|
| Trigger Type | Custom Event |
| Event name | `theme_change` |
| This trigger fires on | All Custom Events |

### 2.5 `CE - clear_all`
| Field | Value |
|-------|-------|
| Trigger Type | Custom Event |
| Event name | `clear_all` |
| This trigger fires on | All Custom Events |

### 2.6 `History Change` (for SPA page views)
| Field | Value |
|-------|-------|
| Trigger Type | History Change |
| This trigger fires on | All History Changes |

---

## Step 3: Create GA4 Configuration Tag

Navigate to **Tags** > **New**:

### 3.1 `GA4 Configuration`
| Field | Value |
|-------|-------|
| Tag Type | Google Analytics: GA4 Configuration |
| Measurement ID | `G-517LEH65ZW` |
| **Consent Settings** | |
| Require additional consent for tag to fire | ☑️ Checked |
| Required consent | `analytics_storage` |
| **Triggering** | |
| Firing Triggers | Initialization - All Pages |

---

## Step 4: Create GA4 Event Tags

Navigate to **Tags** > **New** and create the following GA4 Event tags:

### 4.1 `GA4 Event - Page View (SPA)`
| Field | Value |
|-------|-------|
| Tag Type | Google Analytics: GA4 Event |
| Configuration Tag | `GA4 Configuration` |
| Event Name | `page_view` |
| **Consent Settings** | |
| Require additional consent | ☑️ `analytics_storage` |
| **Triggering** | |
| Firing Triggers | `History Change` |

### 4.2 `GA4 Event - Checkbox Toggle`
| Field | Value |
|-------|-------|
| Tag Type | Google Analytics: GA4 Event |
| Configuration Tag | `GA4 Configuration` |
| Event Name | `checkbox_toggle` |
| **Event Parameters** | |
| Parameter Name | Parameter Value |
| `item_id` | `{{dlv - item_id}}` |
| `section_id` | `{{dlv - section_id}}` |
| `section_title` | `{{dlv - section_title}}` |
| `item_title` | `{{dlv - item_title}}` |
| `checked` | `{{dlv - checked}}` |
| **Consent Settings** | |
| Require additional consent | ☑️ `analytics_storage` |
| **Triggering** | |
| Firing Triggers | `CE - checkbox_toggle` |

### 4.3 `GA4 Event - Section Complete`
| Field | Value |
|-------|-------|
| Tag Type | Google Analytics: GA4 Event |
| Configuration Tag | `GA4 Configuration` |
| Event Name | `section_complete` |
| **Event Parameters** | |
| Parameter Name | Parameter Value |
| `section_id` | `{{dlv - section_id}}` |
| `section_title` | `{{dlv - section_title}}` |
| `item_count` | `{{dlv - item_count}}` |
| **Consent Settings** | |
| Require additional consent | ☑️ `analytics_storage` |
| **Triggering** | |
| Firing Triggers | `CE - section_complete` |

### 4.4 `GA4 Event - Progress Milestone`
| Field | Value |
|-------|-------|
| Tag Type | Google Analytics: GA4 Event |
| Configuration Tag | `GA4 Configuration` |
| Event Name | `progress_milestone` |
| **Event Parameters** | |
| Parameter Name | Parameter Value |
| `percentage` | `{{dlv - percentage}}` |
| **Consent Settings** | |
| Require additional consent | ☑️ `analytics_storage` |
| **Triggering** | |
| Firing Triggers | `CE - progress_milestone` |

### 4.5 `GA4 Event - Theme Change`
| Field | Value |
|-------|-------|
| Tag Type | Google Analytics: GA4 Event |
| Configuration Tag | `GA4 Configuration` |
| Event Name | `theme_change` |
| **Event Parameters** | |
| Parameter Name | Parameter Value |
| `theme` | `{{dlv - theme}}` |
| **Consent Settings** | |
| Require additional consent | ☑️ `analytics_storage` |
| **Triggering** | |
| Firing Triggers | `CE - theme_change` |

### 4.6 `GA4 Event - Clear All`
| Field | Value |
|-------|-------|
| Tag Type | Google Analytics: GA4 Event |
| Configuration Tag | `GA4 Configuration` |
| Event Name | `clear_all` |
| **Event Parameters** | |
| Parameter Name | Parameter Value |
| `section_id` | `{{dlv - section_id}}` |
| `section_title` | `{{dlv - section_title}}` |
| **Consent Settings** | |
| Require additional consent | ☑️ `analytics_storage` |
| **Triggering** | |
| Firing Triggers | `CE - clear_all` |

---

## Step 5: Configure Consent Mode

The application handles Consent Mode defaults in the `index.html` file. GTM will respect these consent signals automatically when you:

1. Enable "Require additional consent for tag to fire" on all GA4 tags
2. Set the required consent to `analytics_storage`

The default consent state is `denied` for all categories:
- `ad_storage`: denied
- `ad_user_data`: denied
- `ad_personalization`: denied
- `analytics_storage`: denied

When users click "Accept" in the cookie banner, the application calls:
```javascript
gtag('consent', 'update', {
  analytics_storage: 'granted'
});
```

This allows GTM tags requiring `analytics_storage` consent to fire.

---

## Step 6: Test with GTM Preview Mode

1. Click **Preview** in GTM
2. Enter the application URL
3. Test each interaction:
   - Accept cookie consent → GA4 Configuration should fire
   - Toggle checkboxes → `checkbox_toggle` events should appear
   - Complete a section → `section_complete` event should fire
   - Reach progress milestones (25%, 50%, 75%, 100%) → `progress_milestone` events
   - Toggle theme → `theme_change` event
   - Click "Clear all" → `clear_all` event
   - Navigate via history (if applicable) → `page_view` event

4. Verify in GA4 DebugView:
   - Go to GA4 Admin → DebugView
   - Confirm events appear with correct parameters

---

## Step 7: Publish Container

Once testing is complete:

1. Click **Submit** in GTM
2. Add a version name (e.g., "GA4 Analytics Implementation v1.0")
3. Add version description
4. Click **Publish**

---

## Event Catalog Reference

| Event Name | Description | Parameters |
|------------|-------------|------------|
| `page_view` | SPA page navigation | `page_path` (automatic) |
| `checkbox_toggle` | Checklist item toggled | `item_id`, `section_id`, `section_title`, `item_title`, `checked` |
| `section_complete` | Section reached 100% | `section_id`, `section_title`, `item_count` |
| `progress_milestone` | Overall progress milestone | `percentage` (25, 50, 75, 100) |
| `theme_change` | Theme toggle clicked | `theme` (light, dark) |
| `clear_all` | Clear all button clicked | `section_id`, `section_title` |

---

## Troubleshooting

### Events not firing in GTM Preview
- Check browser console for JavaScript errors
- Verify dataLayer events are being pushed (type `dataLayer` in console)
- Ensure consent has been granted (check `consent_state` in localStorage)

### GA4 not receiving events
- Verify GA4 Configuration tag is firing
- Check DebugView in GA4 Admin
- Confirm measurement ID is correct (`G-517LEH65ZW`)

### Consent not updating
- Check browser localStorage for `consent_state` key
- Verify cookie banner is displaying correctly
- Check for CSP violations in browser console

---

## Files Changed in Application

| File | Change |
|------|--------|
| `index.html` | Updated CSP, added GTM snippets with consent defaults |
| `package.json` | Added `react-cookie-consent` dependency |
| `src/lib/analytics.ts` | New data layer utility module |
| `src/components/CookieConsentBanner.tsx` | New cookie consent banner component |
| `src/App.tsx` | Added consent banner and restore logic |
| `src/components/SectionCard.tsx` | Added event tracking for checkboxes, sections, clear |
| `src/pages/Index.tsx` | Added progress milestone tracking |
| `src/components/ThemeToggle.tsx` | Added theme change tracking |
