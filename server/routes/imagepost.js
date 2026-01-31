const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const supabase = require("../config/supabase");
const auth = require("../middleware/auth");
const userprofile = require("../models/user_profile");

module.exports = (io) => {
  router.post("/upload_image", auth, upload.single("image"), async (req, res) => {
    try {
      const file = req.file
      const user_id = req.user.id

      if (!file) return res.status(400).json({ message: "No file uploaded" })

      const user = await userprofile.findOne({ user_id })
      if (!user) return res.status(404).json({ message: "User not found" })

      const username = user.username.replace(/\s+/g, "_")
      const filename = `${username}/profile_${Date.now()}_${file.originalname}`


      const { error: uploadError } = await supabase.storage
        .from("Dailist")
        .upload(filename, file.buffer, {
          contentType: file.mimetype,
          upsert: true
        })

      if (uploadError) {
        console.log(uploadError)
        return res.status(500).json({ message: "Supabase upload failed" })
      }


      const { data, error: urlError } = supabase.storage
        .from("Dailist")
        .getPublicUrl(filename)

      if (urlError) {
        console.log(urlError)
        return res.status(500).json({ message: "URL fetch failed" })
      }

      const publicUrl = data.publicUrl

      console.log("PUBLIC URL =", publicUrl)


      await userprofile.findOneAndUpdate(
        { user_id },
        { image: publicUrl },
        { new: true }
      )

      // Assuming the image post is also a type of userpost, you might want to create a fullpost object here
      // For now, I'll emit the publicUrl as the new post content.
      io.emit('post_added', { type: 'image', content: publicUrl, user_id }); // Emit new post event

      return res.status(200).json({
        message: "Uploaded",
        image: publicUrl
      })

    } catch (err) {
      console.error("UPLOAD ERROR:", err)
      return res.status(500).json({ message: "Server error" })
    }
  })
  return router;
}
