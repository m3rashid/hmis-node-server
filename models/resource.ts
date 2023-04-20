import mongoose from 'mongoose'
import type { IBaseModel } from 'models/base'
import { baseModelSchema } from 'models/base'
import type { IPermission } from 'models/permission'
import paginate from 'mongoose-paginate-v2'

export interface IResource extends IBaseModel {
	name: string
	description?: string
	permissions: IPermission[]
}

const resourceSchema = new mongoose.Schema<IResource>(
	{
		...baseModelSchema,
		name: { type: String, required: true },
		description: { type: String },
		permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission', required: true }]
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
