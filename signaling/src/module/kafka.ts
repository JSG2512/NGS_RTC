import { Kafka, KafkaConfig, Producer, Consumer, Admin } from "kafkajs";

// Kafka 클라이언트 타입을 문자열에서 실제 클래스 타입으로 매핑하는 타입
type KafkaClientTypes = {
  producer: Producer;
  consumer: Consumer;
  admin: Admin;
};

const kafkaConfig: KafkaConfig = {
  clientId: process.env.SERVICE_NAME,
  brokers: [process.env.KAFKA_BROKER_1 ?? "localhost:9092"],
  ssl: true,
  sasl: {
    mechanism: "scram-sha-512",
    username: process.env.KAFKA_SASL_USERNAME ?? "",
    password: process.env.KAFKA_SASL_PASSWORD ?? "",
  },
  logLevel: 5,
};

const kafka = new Kafka(kafkaConfig);

let producer: Producer | null = null;
let consumer: Consumer | null = null;
let admin: Admin | null = null;

// getInstance 함수의 제네릭 및 반환 타입을 사용하여 정확한 Kafka 클라이언트 타입 반환
const getInstance = async <T extends keyof KafkaClientTypes>(
  clientType: T
): Promise<KafkaClientTypes[T]> => {
  switch (clientType) {
    case "producer":
      if (!producer) {
        producer = kafka.producer();
        await producer.connect();
      }
      return producer as KafkaClientTypes[T];
    case "consumer":
      if (!consumer) {
        consumer = kafka.consumer({
          groupId: process.env.SERVICE_NAME ?? "default-group",
        });
        await consumer.connect();
      }
      return consumer as KafkaClientTypes[T];
    case "admin":
      if (!admin) {
        admin = kafka.admin();
        await admin.connect();
      }
      return admin as KafkaClientTypes[T];
    default:
      throw new Error("Invalid Kafka client type");
  }
};

const objectToBuffer = (payload: any) => {
  return Buffer.from(JSON.stringify(payload));
};

export { getInstance, objectToBuffer };
