import mongoose from 'mongoose';
import Redis from 'ioredis';

const redis = new Redis({
  // Configure redis here
});

export const toJson = (data: any) => JSON.parse(JSON.stringify(data));

const exec = mongoose.Query.prototype.exec;

// mongoose.Query.prototype.exec = async function (...rest) {
//   const result = await exec.apply(this, ...rest);
//   console.log({
//     query: toJson(this.getQuery()),
//     filter: toJson(this.getFilter()),
//     options: toJson(this.getOptions()),
//     updates: toJson(this.getUpdate() || {}),
//     populatedPaths: toJson(this.getPopulatedPaths() || {}),
// 		 model: this.model.collection.name,
// 	});
//   return result;
// };

// mongoose.Query.prototype.cache = function (options?: { key: string }) {
//   this.enableCache = true;
//   this.hashKey = JSON.stringify(options?.key || 'default');
//   return this;
// };

// mongoose.Query.prototype.exec = async function (...rest) {
//   if (!this.enableCache) {
//     console.log('Data Source: Database');
//     return exec.apply(this, ...rest);
//   }

//   const key = JSON.stringify(
//     Object.assign({}, this.getQuery(), {
//       collection: this.model.collection.name,
//     })
//   );

//   const cachedValue = await redis.hget(this.hashKey, key);

//   if (cachedValue) {
//     const parsedCache = JSON.parse(cachedValue);
//     console.log('Data Source: Cache');
//     return Array.isArray(parsedCache)
//       ? parsedCache.map((doc) => new this.model(doc))
//       : new this.model(parsedCache);
//   }

//   const result = await exec.apply(this, ...rest);

//   redis.hmset(this.hashKey, key, JSON.stringify(result), 'EX', 300);
//   console.log('Data Source: Database');
//   return result;
// };
