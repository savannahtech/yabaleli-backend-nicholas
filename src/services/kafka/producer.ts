import { Kafka, type Producer, type ProducerRecord } from "kafkajs";

export class KafkaProducer {
	private producer: Producer;

	constructor(brokers: string[], clientId: string) {
		const kafka = new Kafka({
			clientId,
			brokers,
		});

		this.producer = kafka.producer();
	}

	public async sendMessage(topic: string, message: string): Promise<void> {
		try {
			await this.producer.connect();
			const record: ProducerRecord = {
				topic,
				messages: [
					{
						value: message,
					},
				],
			};

			await this.producer.send(record);
			console.log(`Message sent to topic ${topic} successfully`);
		} catch (error) {
			console.error("Error sending message:", error);
			throw error;
		} finally {
			await this.producer.disconnect();
		}
	}
}
