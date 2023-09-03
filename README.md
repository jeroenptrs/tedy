# 🧸 tedy

Your sweet Terminal Editor pal.

Tedy 🧸 is a Terminal Editor written in Ink + Typescript. Meaning it's using
NodeJS behind the scenes.

**!IMPORTANT:** this project is in development and will experience:

- Lots of bugs
- Lots of "quirky" (read: unforeseen) behaviour on Windows / Linux as I'm
  developing and testing on MacOS
- Lots of missing features

If you're experiencing an issue, please please please
[report it](https://github.com/jeroenptrs/tedy)!

## TODO: (v1 roadmap - subject to change)

- [x] Process basic inputs
- [x] Code browser
- [x] Save file on Ctrl+C
- [ ] Prompt for confirmation upon saving with Ctrl+C
- [ ] up and down respect text boundaries
- [x] target is not a folder should create a file on save if non-existent
- [ ] target is filled in, ask to create file on saving
- [x] Backspace carries over line to previous line
- [x] CMD + left/right movement
- [ ] CMD+left: 1. move to first non-whitespace character 2. move to 0
- [ ] Investigate CMD + up/down movement
- [ ] Handle resize handling for cursor/viewport
- [ ] pluggable mixins for code
- [ ] alt/option + up/down movement
- [ ] ...

## TODO: (post-v1)

- [ ] open dir + multi file browser
- [ ] command palette
- [ ] ...
