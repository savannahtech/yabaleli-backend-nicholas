import { type Consumer, Kafka } from "kafkajs";
import { consumerTopics } from "../../utils/kafka-topics";

export class KafkaConsumer {
	private consumer: Consumer;

	constructor(brokers: string[], clientId: string, groupId: string) {
		const kafka = new Kafka({
			clientId,
			brokers,
		});

		this.consumer = kafka.consumer({ groupId });
	}

	public async consumeMessage<T>(
		topic: string,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		callback: (payload: any) => void,
	): Promise<void> {
		try {
			await this.consumer.connect();
			await this.consumer.subscribe({ topic, fromBeginning: true });
			await this.consumer.run({
				eachMessage: async ({ topic, partition, message }) => {
					callback({ message: message.value?.toString(), topic, partition });
				},
			});
		} catch (error) {
			console.error("Error sending message:", error);
			throw error;
		} finally {
			await this.consumer.disconnect();
		}
	}

	public async initializeConsumers() {
		for (let i = 0; i < consumerTopics.length; i++) {
			console.log("------init consumer", consumerTopics[i]);
			this.consumeMessage(
				consumerTopics[i].topic,
				(message: KafkaConsumerMessage) => {
					consumerTopics[i].consumer(message);
				},
			);
		}
	}
}
