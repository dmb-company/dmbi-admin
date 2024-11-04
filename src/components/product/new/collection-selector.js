import Spinner from '@/components/common/spinner';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const CollectionSelector = ({ form }) => {
    const { collections, isLoading } = useAdminCollections();

    return (
        <FormField
            control={form.control}
            name="collection_id"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Bộ sản phẩm</FormLabel>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn bộ sản phẩm" />
                            </SelectTrigger>
                        </FormControl>
                        {isLoading ? (
                            <SelectContent>
                                <SelectItem value="loading">
                                    <Spinner />
                                </SelectItem>
                            </SelectContent>
                        ) : (
                            <SelectContent>
                                {collections.map((c) => (
                                    <SelectItem key={c.id} value={c.id}>
                                        {c.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        )}
                    </Select>
                </FormItem>
            )}
        />
    );
};

export default CollectionSelector;
