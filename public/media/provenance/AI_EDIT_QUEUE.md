# AI edit queue — production pass 01

Rule: the subject's face, body, hands, clothing, pose, expression, and the underlying moment are locked. A generated result is accepted only when it demonstrably preserves those elements.

| Status | Source | Proposed mask / edit region | Exact bounded request | Result |
| --- | --- | --- | --- | --- |
| Rejected | `IMG_1982.jpeg` / inventory 335 | People in the distant restaurant background only | Remove unrelated background people and reconstruct the existing tables, seating, and wall; preserve the foreground subject exactly. | A test result removed people but altered face and shirt detail. It is not used or copied into the production site. |
| Queued | `Italy/IMG_7566.jpeg` / inventory 570 | Pedestrians and vehicles behind the subject only | Remove unrelated background pedestrians and vehicles; rebuild only existing pavement/road/buildings while preserving the subject exactly. | Deferred: broad multi-object removal needs mask-guided review; do not substitute a fabricated portrait. |
| Queued | `IMG_3496.jpeg` / inventory 495 | Workplace material in the background, if any public crop needs it | Redact/crop background only; leave the person untouched. | Deferred pending explicit review of what may be publicly shown. |

No AI-generated person, background replacement, or “better version” of a real source is included in this pass.
