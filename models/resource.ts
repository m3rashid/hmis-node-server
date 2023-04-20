import mongoose from 'mongoose'
import type { IBaseModel } from 'models/base'
import { baseModelSchema } from 'models/base'
// import type { IPermission } from 'models/permission'
import paginate from 'mongoose-paginate-v2'

export interface IResource extends IBaseModel {
	displayName: string
	actualName: string
	description?: string
	type: string
}

const resourceSchema = new mongoose.Schema<IResource>(
	{
		...baseModelSchema,
		displayName: { type: String, required: true },
		actualName: { type: String, unique: true, required: true },
		description: { type: String },
		type: { type: String }
	},
	{ timestamps: true }
)

resourceSchema.plugin(paginate)
interface IResourceDocument extends Omit<mongoose.Document, '_id'>, IResource {}

const ResourceModel = mongoose.model<IResourceDocument, mongoose.PaginateModel<IResourceDocument>>(
	'Resource',
	resourceSchema
)
export default ResourceModel
