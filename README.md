# 🎧 Slowly Reverb

**Transform your favorite tracks into mesmerizing Slow & Reverb MP3s — 100% locally in your browser.**

[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-black.svg?style=flat-square)](http://makeapullrequest.com)
[![Built with Vanilla JS](https://img.shields.io/badge/Built%20with-Vanilla%20JS-black.svg?style=flat-square)]()

---

## 🖼️ Website Preview

<!-- 
👇 INSTRUCTIONS TO ADD YOUR IMAGE: 
1. Drag and drop your screenshot image directly into the GitHub README editor, OR 
2. Upload an image named 'screenshot.png' to this folder and keep the path as './screenshot.png'
-->

<p align="center">
  <img src="https://github.com/themaulik/Slowly-Reverb/blob/main/Screenshot.png" alt="Slowly Reverb Website Screenshot" width="100%" style="border: 2px solid #000; border-radius: 8px; box-shadow: 4px 4px 0px #000;" />
  <br>
  <em>A clean, minimal, and sharp Material UI experience.</em>
</p>

---

## 🌟 About The Project

**Slowly Reverb** is a lightweight, open-source web application that allows users to convert normal audio files into "Slowed + Reverb" MP3 tracks. 

Unlike other online converters that upload your files to a remote server, **Slowly Reverb processes everything locally in your browser** using the Web Audio API. This means your music never leaves your device, ensuring **100% privacy and zero server costs**.

## ✨ Features

- 🚀 **100% Client-Side Processing**: No data is uploaded to any server. Your audio stays on your device.
- 🎵 **Direct MP3 Export**: Uses `lamejs` to encode and export high-quality 128kbps MP3 files directly.
- 🎛️ **Customizable Controls**: Adjust the playback speed (slowdown) and reverb intensity to your exact liking.
- 🎨 **Sharp Material UI**: A clean, minimal, black-and-white design with crisp borders and smooth animations.
- 🔄 **4-Step Workflow**: 
  1. **Upload** (Drag & Drop)
  2. **Customize** (Speed & Reverb sliders)
  3. **Process** (Cool waveform animation)
  4. **Download** (Get your MP3)
- 📱 **Fully Responsive**: Works flawlessly on desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

| Frontend | Audio Processing | Export |
| :--- | :--- | :--- |
| **HTML5 / CSS3** | **Web Audio API** (`OfflineAudioContext`) | **lamejs** (MP3 Encoder) |
| **Vanilla JavaScript** | **ConvolverNode** (Reverb) | **FileSaver.js** |

---

## 🚀 Getting Started

Since this is a pure static website, there is no complex build process or backend required.

### Prerequisites
Just a modern web browser (Chrome, Firefox, Safari, Edge) and a simple local server (optional, but recommended for testing).

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/slowly-reverb.git
   cd slowly-reverb
   ```
2. Open the `index.html` file directly in your browser, OR run a quick local server:
   ```bash
   # If you have Python installed
   python -m http.server 8000
   
   # If you have Node.js installed
   npx serve
   ```
3. Navigate to `http://localhost:8000` in your browser.

### 🌐 Deploy to GitHub Pages (Free Hosting)
1. Push this code to a new **Public** GitHub repository.
2. Go to your repository **Settings** > **Pages**.
3. Under "Build and deployment", select **Source: Deploy from a branch**.
4. Choose the `main` branch and the `/root` folder, then click **Save**.
5. Your site will be live at `https://YOUR_USERNAME.github.io/slowly-reverb/`!

---

## ⚖️ Legal Disclaimer & Copyright Notice

> **IMPORTANT: PLEASE READ CAREFULLY**
>
> **Slowly Reverb** is an experimental and educational tool designed to demonstrate client-side audio processing capabilities. 
> 
> - **No Copyright Infringement Intended:** This tool does not host, store, distribute, or transmit any audio files. All processing happens locally on the user's device.
> - **User Responsibility:** Users are solely responsible for the audio files they choose to process. You must ensure you have the legal right, ownership, or proper licenses (e.g., Creative Commons, Fair Use) to modify and download the audio.
> - **No Commercial Use of Copyrighted Material:** We do not support or condone the unauthorized use of copyrighted music. 
> - **Indemnification:** By using this tool, you agree that the creators/owners of Slowly Reverb are not liable for any copyright violations, legal issues, or damages arising from your use of this software.

*For full details, please refer to the [Terms and Conditions](./terms.html) and [Privacy Policy](./privacy.html) pages included in the project.*

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Since this is an open-source project, we love the community's input.

1. Fork the Project (`git clone https://github.com/YOUR_USERNAME/slowly-reverb.git`)
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📬 Contact

**Maulik Goswami**  
Project Link: [https://github.com/themaulik/slowly-reverb](https://github.com/themaulik/slowly-reverb)

---

<p align="center">
  <strong>Slowly Reverb</strong> — Made with 🎧 and ☕ by Maulik Goswami
</p>
