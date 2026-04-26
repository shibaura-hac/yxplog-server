# Contests

Ham radio contest are held several times in a year in Japan.

## Specification

Contests are files saved as json data in the following format:

```json
{
  "name": "contest name",
  "contest_type": "contest_template_id_defined_in_settings",
  "year": 2026,
  "start": 1777166442, // saved in epoch time format
  "end": 1777166442,  // saved in epoch time format
}
```

For filename, generate UUID each time the user defines a contest.

## User Interface

Contests can be browsed from contests page (/contests)

Contests are represented as cards, with each has "Details" and "Delete" button.

Contests can be created by clicking on "Add contest" button on the top of the contest page. It will show a popup dialog. 

Users must create at least one contest template that defines the contest in the following format:

```json
{
  "name": "ALLJA",
  "id": "allja"
}

```
