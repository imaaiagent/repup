# 🐾 Repup

<p align="center">
  <b>Your GitHub repo has a dog now.</b><br>
  A tiny living creature that grows with your code.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-experimental-orange">
  <img src="https://img.shields.io/badge/node-18%2B-green">
  <img src="https://img.shields.io/badge/license-MIT-blue">
</p>

---

## 🧪 What happens if your GitHub repo had a Tamagotchi?

Repup watches your repository.

You ship → **it gains XP.**  
You keep shipping → **it gets excited.**  
You disappear → **it gets sleepy.**  
You make a lot of commits → **it gets chaotic.**

```text
 / \__
(    @\___
 /         O
/   (_____/
/_____/   U

        REPUP 🐶
 
        LEVEL 7
        XP 684
        
        mood: EXCITED
        streak: 9 days

        "WE ARE SHIPPING."

   last commit
   └─ make the thing actually work
```

## ⚡ Try it

```bash
git clone https://github.com/YOUR_USERNAME/repup
cd repup
npm install
npm run build
node dist/index.js init REPUP
node dist/index.js
```

Or during development:

```bash
npm run dev
```

## 🧠 What it remembers

Repup keeps a tiny local memory:

- recent commits
- XP
- level
- mood
- streak
- last seen
- pet name

The state lives in `.repup.json`.

No account.
No database.
No API key.

Just your repo and your pet.

## 🐾 Commands

```bash
repup init REPUP
repup status
repup name MIKA
repup memory
```

## 🔥 The roadmap

The terminal pet is only the beginning.

- [x] XP
- [x] moods
- [x] local memory
- [x] commit reactions
- [ ] GitHub API
- [ ] GitHub Issues awareness
- [ ] Pull request reactions
- [ ] AI personality
- [ ] long-term memory
- [ ] animated terminal
- [ ] README pet widget
- [ ] GitHub profile pet
- [ ] Discord pet
- [ ] web dashboard
- [ ] multiplayer pets
- [ ] physical pet 👀

## 🧬 Why Repup?

Most developer tools show you numbers.

Repup gives those numbers a **personality**.

Your repository stops feeling like a folder full of files.

It starts feeling alive.

## 📣 Share your pet

Run:

```bash
repup
```

Take a screenshot.

Post it.

> I gave my GitHub repo a pet.
>
> It gets happier when I ship.
> It gets sleepy when I disappear.
>
> Open source ↓

---

## 🤝 Contributing

This project is intentionally tiny.

If you can think of a funny behavior for the pet, open an issue.

Examples:

- "Pet should rage when tests fail."
- "Pet should celebrate the first PR."
- "Pet should become sick if dependencies are outdated."
- "Pet should remember embarrassing commit messages."

The weird ideas are welcome.

## ⭐ Star the repo

If your repo has a pet now, it deserves a little love.

**Made for people who ship.**
