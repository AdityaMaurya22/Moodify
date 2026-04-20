const songModel = require("../model/song.model")
const id3 = require("node-id3")
const storageService = require("../services/storage.service")

async function uploadSong(req, res) {

    const songBuffer = req.file.buffer

    const tags = id3.read(songBuffer)

    const { mood } = req.body

    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            folder: "/cohort-2/moodify/songs"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "/cohort-2/moodify/songs"
        })
    ])

    const song = await songModel.create({
        title: tags.title,
        url: songFile.url,
        posterUrl: posterFile.url,
        mood
    })

    res.status(201).json({
        message: "Song created Successfully",
        song
    })
}

async function getSongs(req, res) {
    const { mood } = req.query

    const song = await songModel.findOne({mood})

    res.status(200).json({
        message: "Song fetched Successfully",
        song
    })
}

module.exports = { uploadSong, getSongs }