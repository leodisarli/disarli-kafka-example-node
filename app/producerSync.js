const kafka = require('kafka-node');
const config = require('../config/config.js');

try {
  const Producer = kafka.Producer;
  const client = new kafka.KafkaClient(config.kafka_server);
  const producer = new Producer(client);
  const kafka_topic = 'test';

  console.log(kafka_topic);

  producer.on('ready', async function() {
    for (let index = 0; index < 10; index++) {
      let payloads = [
        {
          topic: kafka_topic,
          messages: index,
        }
      ];
      let push_status = producer.send(payloads, (err, data) => {
        if (err) {
          console.log('[kafka-producer -> '+kafka_topic+' '+index+']: broker update failed');
        } else {
          console.log('[kafka-producer -> '+kafka_topic+' '+index+']: broker update success');
        }
      });
      
    }
    
  });

  producer.on('error', function(err) {
    console.log(err);
    console.log('[kafka-producer -> '+kafka_topic+']: connection errored');
    throw err;
  });
}
catch(e) {
  console.log(e);
}