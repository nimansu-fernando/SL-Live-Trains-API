const lineService = require('../services/line-service');

exports.getAllLines = async (req, res) => {
    try {
        const [rows] = await lineService.getAllLines();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving lines', error });
    }
};

exports.getLineById = async (req, res) => {
    try {
        const [rows] = await lineService.getLineById(req.params.id);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Line not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving line', error });
    }
};

exports.createLine = async (req, res) => {
    try {
        const result = await lineService.createLine(req.body);
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating line', error });
    }
};

exports.updateLine = async (req, res) => {
    try {
        await lineService.updateLine(req.params.id, req.body);
        res.json({ message: 'Line updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating line', error });
    }
};

exports.deleteLine = async (req, res) => {
    try {
        await lineService.deleteLine(req.params.id);
        res.json({ message: 'Line deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting line', error });
    }
};
