const tabla = 'assistance';

class AssistancesDAO {

    async getAssistances(userId, postId) {
        const [results] = await global.connection.promise().query(`SELECT * FROM ?? WHERE user_id = ${userId} AND event_id = ${postId}`, [tabla]);
        if (results.length === 0) {
            return {
                error: "No se ha encontrado ninguna asistencia"
            }
        } else {
            return results;
        }

    }

    async postAssistances(userId, eventId) {
        try {
            const results = await global.connection.promise().query(`INSERT INTO ?? (user_id, event_id) VALUES (${userId}, ${eventId})`, [tabla]);
            return {
                message: "Asistencia añadida"
            }
        } catch (error) {
            return {
                error: "Ya has asistido a este evento"
            }
        }
    }

    async putAssistances(userId, eventId, body) {
        let results = ""

        if (body.puntuation !== undefined && body.comentary === undefined) {
            results = await global.connection.promise().query(`UPDATE ?? SET ?? = ${body.puntuation} WHERE ?? = ${userId} AND ?? = ${eventId}`, [tabla, "puntuation", "user_id", "event_id"]);
        }
        if (body.puntuation === undefined && body.comentary !== undefined) {
            results = await global.connection.promise().query(`UPDATE ?? SET ?? = "${body.comentary}" WHERE user_id = ${userId} AND event_id = ${eventId}`, [tabla, "comentary"]);
        }
        if (body.puntuation !== undefined && body.comentary !== undefined) {
            results = await global.connection.promise().query(`UPDATE ?? SET ?? = ${body.puntuation}, ?? = "${body.comentary}" WHERE user_id = ${userId} AND event_id = ${eventId}`, [tabla, "puntuation", "comentary"]);
        }
        if (body.puntuation === undefined && body.comentary === undefined) {
            return {
                error: "Petición vacia"
            }
        }
        return {
            message: "Asistencia actualizada"
        }
    }

    async deleteAssistances(user_id, event_id) {
        const results = await global.connection.promise().query(`DELETE FROM ?? WHERE ?? = ${user_id} AND ?? = ${event_id}`, [tabla, "user_id", "event_id"]);
        if (results[0].affectedRows === 0) {
            return {
                error: "No se ha encontrado ninguna asistencia"
            }
        } else {
            return results[0];
        }

    }

    async getAll() {
        const [results] = await global.connection.promise().query(`SELECT * FROM ??`, [tabla]);
        if (results.length === 0) {
            return {
                error: "No hay assistencias"
        }
        } else {
            return results;
        }
    }

}

module.exports = AssistancesDAO